import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { isEqual } from "lodash";

import Error from "../../components/Error";
import Input from "../../components/ExpandInput";
import Tag from "../../components/Tag";
import { addTag, updateRelationships } from "../../redux/Tags/actions";
import { noSelect } from "../../utils/Css";
import { range } from "../../utils/Math";

const TagContainer = styled.div`
  ${noSelect};
  background: #eee;
  padding: 10px;

  & > * {
    vertical-align: middle;
  }
`;

class TagSearch extends React.Component {
  state = {
    filter: "",
    filteredTags: [],
    error: null,
    currentIndex: -1
  };

  componentDidMount() {
    this.filter("");
  }

  componentDidUpdate(prevProps, prevState) {
    const { props, state } = this;

    // If tags suffered some kind of mutation
    if (!isEqual(prevProps.tags, props.tags)) {
      // Refilter tags
      this.filter(state.filter);
    }

    if (!isEqual(prevState.filteredTags, state.filteredTags)) {
      if (prevState.filter === state.filter) {
        this.setState({
          currentIndex: range(
            state.currentIndex,
            -1,
            state.filteredTags.length - 1
          )
        });
      } else {
        if (!state.filter) {
          this.setState({ currentIndex: -1 });
        } else if (state.filteredTags.length) {
          this.setState({ currentIndex: 0 });
        } else {
          this.setState({ currentIndex: -1 });
        }
      }
    }
  }

  onChange = evt => {
    const { state } = this;

    if (evt.target.value !== state.filter) {
      this.filter(evt.target.value);
    }
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
          if (state.filteredTags.length === 1) {
            this.setState({ filter: "", currentIndex: -1 });
          }
        } else if (state.currentIndex === -1 && state.filter) {
          this.setState({ currentIndex: 0 });
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

  filter(newVal) {
    const { props } = this;

    try {
      const regex = new RegExp(newVal, "gi");

      const filteredTags = props.tags.filter(t => {
        regex.lastIndex = 0;
        return regex.test(t.name);
      });

      this.setState({
        filter: newVal,
        filteredTags,
        error: null
      });
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  select(nid) {
    this.props.onSelect(nid);
  }

  selectCurrent() {
    const { state } = this;
    this.select(state.filteredTags[state.currentIndex].nid);
  }

  updateIndex(type) {
    const { state } = this;

    switch (type) {
      case "ARRAY_SIZE":
        this.setState({
          currentIndex: range(
            state.currentIndex,
            -1,
            state.filteredTags.length - 1
          )
        });
        break;
      case "FILTER_CHANGE":
        this.setState({ currentIndex: state.filter ? 0 : -1 });
        break;
      default:
    }
  }

  render() {
    const { props, state } = this;

    return (
      <div>
        {props.children}
        <TagContainer>
          <Input
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            value={state.filter}
          />
        </TagContainer>
        <TagContainer>
          {state.filteredTags.map((tag, i) => (
            <Tag
              {...tag}
              hover={i === state.currentIndex}
              key={tag.nid}
              onClick={() => this.select(tag.nid)}
              prefix={tag.rank}
            />
          ))}
          {state.filter && (
            <Tag
              hover={state.currentIndex === -1}
              name="New Tag"
              color="#2878b1"
              prefix="+"
            />
          )}
        </TagContainer>
        <Error>{state.error}</Error>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //   tags: state.tags
});

const mapDisptachToProps = dispatch => ({
  addTag: name => dispatch(addTag(name)),
  updateRelationships: tags => dispatch(updateRelationships(tags))
});

export default connect(mapStateToProps, mapDisptachToProps)(TagSearch);
