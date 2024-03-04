import React, { useEffect } from "react";
import styles from './corpsystems.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, loading } from '../user/userSlice';
import dictionary from '../../dictionary.json';
import { darkTheme } from "../main/mainpageSlice";
import { TopBar } from "../topBar/topBar";
import { useParams } from "react-router-dom";
import { setSystem } from "./corpsystemsSlice";
import { changeTheme } from "../main/mainpageSlice";
import { Row } from "../components/row/row";

export const Corpsystems = () => {
  const { system } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector(user);
  const dark = useSelector(darkTheme);
  const load = useSelector(loading);

  const lang = userData.lang;

  useEffect(() => {
    dispatch(setSystem(system));
    dispatch(changeTheme( false || JSON.parse(localStorage.getItem('darkTheme')) ));
  }, [dispatch, system]);

  const corpsystemsStyle = dark 
    ? `${styles.corpsystems} ${styles.dark}`
    : `${styles.corpsystems}`

  return (
    <section className={corpsystemsStyle} >
      <div className={styles.wrapperCS} >
        <TopBar/>
        { !load
          ? <form className={styles.form}>
              <Row>
                <label>{`${dictionary.applicant[lang]}:`}</label>
                {`${userData.given_name}`}
              </Row>

            </form>
          : null
        }
      </div>
    </section>
  )
}
