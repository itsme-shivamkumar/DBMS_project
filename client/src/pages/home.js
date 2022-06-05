import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import Profile from "../components/profile/Profile";
import Scream from "../components/scream/Scream";
import PropsType from "prop-types";
import ScreamSkeleton from "../util/ScreamSkeleton";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataAction";
// import { SET_SCREAMS } from '../redux/types'

export class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container space={16}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile></Profile>
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropsType.func.isRequired,
  data: PropsType.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(home);
