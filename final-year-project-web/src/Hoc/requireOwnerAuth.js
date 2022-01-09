
import React, { useEffect } from "react";
import { connect } from "react-redux";

// eslint-disable-next-line
export default ChildComponent => {
  const ComposedComponent = props => {
    // useEffect(() => {
    //   if (props.auth) {
    //     return props.history.push("/owner");
    //   } else { 
    //     return props.history.push("/");
    //   }
    // }, [props.auth, props.history]);

    return <ChildComponent {...props} />;
  };

  function mapStateToProps(state) {
    return {
      auth: (state.auth.user && state.auth.user.id) || null,
    };
  }

  return connect(mapStateToProps)(ComposedComponent);
};