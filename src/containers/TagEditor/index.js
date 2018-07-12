import React from "react";
import { cloneDeep } from "lodash";
import { connect } from "react-redux";

import Input from "../../components/ExpandInput";
import Tag from "../../components/Tag";
import ColorBox from "../../components/ColorBox";
import TagSearch from "../TagSearch";
import { addTag, updateTags } from "../../redux/Tags/actions";
import { MaterialColorsArr } from "../../utils/Colors";
import { MdColorLens } from 'react-icons/lib/md';
import { FaTag } from 'react-icons/lib/fa';

class Tagger extends React.Component {
  state = {
    selectedTagNid: null
  };

  componentDidMount() {
    const { props } = this;
    console.log("props.tags", props.tags);
  }

  select(nid) {
    const { props } = this;

    const selectedTag = props.tags.tagList.find(t => t.nid === nid);

    this.setState({
      selectedTag: cloneDeep(selectedTag),
      name: selectedTag.name,
      color: selectedTag.color
    });
  }

  saveChanges = () => {
    const { props, state } = this;
    props.updateTags([{
      ...state.selectedTag,
      name: state.name,
      color: state.color,
    }]);
  }

  unselect(nid) {
    this.setState({
      selectedTag: null,
      name: "",
      color: ""
    });
  }

  render() {
    const { props, state } = this;

    return (
      <div>
        <h1>- TagEditor -</h1>
        <TagSearch tags={props.tags.tagList} onSelect={nid => this.select(nid)}>
          {state.selectedTag && (
            <Tag
              name={state.name}
              color={state.color}
              key={state.selectedTag.nid}
              onClick={() => this.unselect()}
            />
          )}
          <div>
            <Input
              value={state.name}
              onChange={evt => this.setState({ name: evt.target.value })}
              icon={<FaTag />}
            />
            <Input
              value={state.color}
              onChange={evt => this.setState({ color: evt.target.value })}
              icon={<MdColorLens />}
              style={{ color: state.color }}
            />
            {MaterialColorsArr.map(c => (
              <ColorBox color={c} onClick={() => this.setState({ color: c })} />
            ))}
            <button onClick={this.saveChanges}>Save Changes</button>
          </div>
        </TagSearch>
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
