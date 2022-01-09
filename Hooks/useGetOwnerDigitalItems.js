import React from "react";

import FirebaseService from "../services/FirebaseService";

export const useGetOwnerDigitalItems = (propValue, id) => {
  const _isMounted = React.useRef(true);
  const [documents, setDocuments] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [err, setErr] = React.useState("false");
  React.useEffect(() => {
    setLoader(true);
    FirebaseService.getOwnersDigitalItemsRequest(id)
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({ id: doc.id, ...doc.data() })
        );
        setDocuments(arr.reverse());
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setErr(err.message);
      });
      return () => {
        _isMounted.current = false;
      }
  }, [setLoader, propValue, id]);

  return {
    documents,
    loader,
    err,
  };
};