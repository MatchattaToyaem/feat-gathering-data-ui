import React from "react";
import {
  IonList,
} from "@ionic/react";
import { IResults } from "../../utils/interfaces/IResult";
import ResultItem from "./ResultItem";

interface IProps {
  results: Array<IResults> | [];
  onClickListener: Function;
}

const ResultsList: React.FC<IProps> = (props) => {
  const [results, setResults] = React.useState<Array<IResults>>([]);

  React.useEffect(() => {
    setResults(props.results);
  }, [props]);

  const onDelete = (id: number) => {
    const request = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "delete-id": String(id) },
    };
    const endpoint = process.env.REACT_APP_END_POINTS||""
    console.log(endpoint)
    fetch(endpoint, request).then(() => {
      const deleteIndex = (results as Array<IResults>).findIndex(
        (result) => result.id === id
      );
      console.log(deleteIndex)
      setResults((prvResult) => {
        const results = [...prvResult]
        results.splice(deleteIndex, 1)
        return results
      });
    }).catch((error)=>{console.log(error)});
  };

  return (
    <IonList lines="full" mode="md">
      {results.map((result: IResults) => {
        return (
          <ResultItem onDelete={onDelete} objectID={result.idFromNSTDA} data={result} />
        );
      })}
    </IonList>
  );
};
export default ResultsList;
