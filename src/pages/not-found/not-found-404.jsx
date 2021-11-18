import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './not-found-404.module.css';
import {getRandomBool} from "../../utils/utils";

const NotFound404Page = () => {
    const [pic, setPic] = useState(false);
    useEffect(() => {
        const vle_bool = getRandomBool();
        setPic(vle_bool);
    }, [pic]);
    return (
        <div className={styles.wrapper + ' ' + (pic ? styles.wrapper_bg_s_1 : styles.wrapper_bg_s_2)}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Oops! 404 Error</h1>
                    <p>The page you requested does not exist</p>
                    <br/>
                    <br/>
                    <p>back to <Link to='/' className={styles.link}>homepage</Link></p>
                </div>
            </div>
        </div>
    );
}
export default NotFound404Page;
