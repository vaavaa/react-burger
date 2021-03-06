import React, {useEffect, useState} from "react";
import style from './reset-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {postResetPassword} from "../../services/actions/user";
import {useDispatch, useSelector} from "react-redux";

const ResetPasswordPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {isAuth} = useSelector(state => state.userData);

    const [formData, setFormData] = useState({
        password: "",
        token: ""
    })

    useEffect(() => {
        if (document.referrer.length === 0) {
            history.push('/forgot-password');
        }
    }, [history])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(postResetPassword(formData, history));
    }

    if (isAuth) {
        return (<Redirect to={{pathname: '/'}}/>)
    }

    return (
        <div className={style.container}>
            <div className={style.login_container}>
                <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
                <form onSubmit={handleFormSubmit} className="form" action="">
                    <div className="mb-6">
                        <Input
                            type={"password"}
                            icon={"ShowIcon"}
                            size={"default"}
                            placeholder="Введите новый пароль"
                            error={false}
                            errorText={"Ошибка"}
                            name={"password"}
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            type={"text"}
                            size={"default"}
                            placeholder="Введите код из письма"
                            error={false}
                            errorText={"Ошибка"}
                            name={"token"}
                            onChange={handleChange}
                            value={formData.token}
                        />
                    </div>
                    <div className={`${style.form_button} mb-20`}>
                        <Button type={"primary"} size="medium">Войти</Button>
                    </div>
                </form>
                <div className={style.login_links}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Уже зарегистрированы? <Link to={`/login`} className={`${style.link} text text_color_accent`}>Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage;
