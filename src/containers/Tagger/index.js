import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Input from "../../components/ExpandInput";
import Tag from "../../components/Tag";
import { addTag, updateRelationships } from "../../redux/Tags/actions";
import { noSelect } from "../../utils/Css";
import { noop } from "../../utils";

const TagContainer = styled.div`
  ${noSelect} background: #EEE;
  padding: 10px;

  & > * {
    vertical-align: middle;
  }
`;

class Viewer extends React.Component {
  state = {
    filter: "",
    filteredTags: [],
    selectedTags: [],
    error: null,
    currentIndex: -1
  };

  static getDerivedStateFromProps(nextProps, lastState) {
    // Laststate selected tags mapped to their nid
    const selectedTags = lastState.selectedTags.map(e => e.nid);
    // Remaning tags is ALL tags minus the selected ones
    const remainingTags = nextProps.tags.tagList.filter(
      e => !~selectedTags.indexOf(e.nid)
    );

    return {
      // Pre-rank tags
      filteredTags: Viewer.rank(remainingTags),
      // Remaning tags to filter over
      tags: remainingTags
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { props, state } = this;

    // If tags suffered some kind of mutation
    if (prevProps.tags.modifiedTime !== props.tags.modifiedTime) {
      // Refilter tags
      this.filter();
    }

    // If filter string has changed
    if (prevState.filter !== state.filter) {
      // Apply filter
      this.filter();
    }
  }

  onChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  onKeyDown = evt => {
    const { state } = this;
    const { key } = evt;

    switch (key) {
      case "ArrowDown":
        this.setState({
          currentIndex:
            (state.currentIndex + 2) % (state.filteredTags.length + 1) - 1
        });
        return evt.preventDefault();
      case "ArrowUp":
        this.setState({
          currentIndex:
            state.currentIndex === -1
              ? state.filteredTags.length - 1
              : state.currentIndex - 1
        });
        return evt.preventDefault();
      case "Enter":
        if (state.currentIndex !== -1 && state.filteredTags.length) {
          this.selectCurrent();
        } else if (state.filter) {
          this.addTag();
        }
        return evt.preventDefault();
      default:
        break;
    }
  };

  addTag() {
    const { props, state } = this;

    props.addTag(state.filter);
  }

  static calculatePrefix(tag, referenceTags) {
    // If there are tags to be references
    if (referenceTags && referenceTags.length) {
      // Get the name id's (nid)
      const nids = referenceTags.map(t => t.nid);
      // Get relationships from tag, filter nids and reduce to the count
      return (
        Object.entries(tag.relationships)
          .filter(e => ~nids.indexOf(e[0]))
          .reduce((acc, e) => acc + e[1], 0) || null
      );
    }

    // Reduce relationships to their count
    return (
      Object.values(tag.relationships).reduce((acc, e) => acc + e, 0) || null
    );
  }

  filter() {
    const { state } = this;
    const { filter } = state;

    try {
      const regex = new RegExp(filter, "gi");

      const filteredTags = state.tags.filter(t => {
        regex.lastIndex = 0;
        return regex.test(t.name);
      });

      this.setState({
        filter,
        filteredTags: Viewer.rank(filteredTags, state.selectedTags),
        error: null,
        currentIndex: filter ? 0 : -1
      });
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  static rank(tags, nids) {
    return tags
      .map(t => ({
        ...t,
        rank: Viewer.calculatePrefix(t, nids)
      }))
      .sort((a, b) => b.rank - a.rank);
  }

  saveRelationships = () => {
    const { props, state } = this;

    const nids = state.selectedTags.map(t => t.nid);
    const mapped = state.selectedTags.map(t => {
      const newRelationShips = {};
      nids.forEach(nid => {
        if (nid === t.nid) return;
        newRelationShips[nid] = (t.relationships[nid] || 0) + 1;
      });

      return {
        ...t,
        relationships: {
          ...t.relationships,
          ...newRelationShips
        }
      };
    });

    this.setState({ selectedTags: mapped });
    props.updateRelationships(mapped);
  };

  select(index) {
    const { state } = this;

    const currentTag = state.filteredTags[index];
    const selectedTags = [...state.selectedTags, currentTag];

    this.setState({
      selectedTags,
      filteredTags: Viewer.rank(
        state.filteredTags.filter(tag => tag.nid !== currentTag.nid),
        selectedTags
      ),
      tags: state.tags.filter(tag => tag.nid !== currentTag.nid),
      currentIndex: Math.min(state.currentIndex, state.filteredTags.length - 2)
    });
  }

  selectCurrent() {
    this.select(this.state.currentIndex);
  }

  unselect(index) {
    const { state } = this;

    const currentTag = state.selectedTags[index];

    this.setState(
      {
        selectedTags: state.selectedTags.filter(
          tag => tag.nid !== currentTag.nid
        ),
        filteredTags: Viewer.rank([...state.filteredTags, currentTag]),
        tags: [...state.tags, currentTag]
      },
      () => this.filter()
    );
  }

  render() {
    const { state } = this;

    return (
      <div>
        <h1>- Tagger -</h1>
        <TagContainer>
          {state.selectedTags.map((tag, i) => (
            <Tag
              {...tag}
              canExclude
              key={tag.nid}
              onClick={() => this.unselect(i)}
            />
          ))}
          <Input
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            value={state.filter}
            size="1.25em"
          />
        </TagContainer>
        <TagContainer>
          {state.filteredTags.map((tag, i) => (
            <Tag
              {...tag}
              hover={i === state.currentIndex}
              key={tag.nid}
              onClick={() => this.select(i)}
              prefix={tag.rank}
            />
          ))}
        </TagContainer>
        <button onClick={this.saveRelationships}>Save Relationships</button>
        {state.error}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tags: state.tags
});

const mapDisptachToProps = dispatch => ({
  addTag: name => dispatch(addTag(name)),
  updateRelationships: tags => dispatch(updateRelationships(tags))
});

export default connect(mapStateToProps, mapDisptachToProps)(Viewer);
