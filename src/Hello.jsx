import HeartLogo from './assets/react.svg';
import styles from "./Hello.module.css";

function Hello({ name }) {
    return (
        <>
            <img className={styles['heart-logo']} src={HeartLogo}></img>
            <h1>Hello {name}</h1>
        </>
    );
}

export default Hello;
