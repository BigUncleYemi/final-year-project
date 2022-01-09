import React from "react";

import FirebaseService from "../services/FirebaseService";

export const useGetDigitalItems = (propValue) => {
  const _isMounted = React.useRef(true);
  const [documents, setDocuments] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [err, setErr] = React.useState("false");
  React.useEffect(() => {
    setLoader(true);
    FirebaseService.getDigitalItemsRequest()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) => {
          arr.push({ id: doc.id, ...doc.data() })
          if (Array.isArray(propValue) && propValue.length > 0) {
            arr = arr.filter(item => propValue.includes(Math.floor(item.rating)));
          }
          return arr;
        });
        setDocuments(arr);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setErr(err.message);
      });
      return () => {
        _isMounted.current = false;
      }
  }, [setLoader, propValue]);

  return {
    documents,
    loader,
    err,
  };
};