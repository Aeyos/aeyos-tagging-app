import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Input from "../../components/ExpandInput";
import Tag from "../../components/Tag";
import { addTag, updateTags } from "../../redux/Tags/actions";
import { noSelect } from "../../utils/Css";
import { noop } from "../../utils";
import TagSearch from "../TagSearch";

class Tagger extends React.Component {
  state = {
    rankedTags: [],
    selectedTags: []
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
      rankedTags: Tagger.rank(remainingTags)
    };
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

  static rank(tags, nids) {
    return tags
      .map(t => ({
        ...t,
        rank: Tagger.calculatePrefix(t, nids)
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
    props.updateTags(mapped);
  };

  select(nid) {
    console.log("nid", nid);
    const { state } = this;

    const currentTag = state.rankedTags.find(t => t.nid === nid);
    const selectedTags = [...state.selectedTags, currentTag];

    this.setState({
      selectedTags,
      rankedTags: Tagger.rank(
        state.rankedTags.filter(tag => tag.nid !== currentTag.nid),
        selectedTags
      )
    });
  }

  unselect(index) {
    const { state } = this;

    const currentTag = state.selectedTags[index];

    this.setState({
      selectedTags: state.selectedTags.filter(
        tag => tag.nid !== currentTag.nid
      ),
      rankedTags: Tagger.rank([...state.rankedTags, currentTag])
    });
  }

  render() {
    const { state } = this;

    return (
      <div>
        <h1>- Tagger -</h1>
        <TagSearch tags={state.rankedTags} onSelect={nid => this.select(nid)}>
          {state.selectedTags.map((tag, i) => (
            <Tag
              {...tag}
              canExclude
              key={tag.nid}
              onClick={() => this.unselect(i)}
            />
          ))}
        </TagSearch>
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
  updateTags: tags => dispatch(updateTags(tags))
});

export default connect(mapStateToProps, mapDisptachToProps)(Tagger);
