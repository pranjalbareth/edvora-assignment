import styles from './ResultsNotFound.module.css';


export const ResultsNotFound = () => {

    const { results_not_found } = styles;

    return (
        <div className = { results_not_found } >No Result</div>
    );
};