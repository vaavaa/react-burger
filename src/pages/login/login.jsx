import React, {useState} from "react";
import style from "./login.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {postLogin} from "../../services/actions/user";

const LoginPage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.userData);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    let {from} = location.state || {from: {pathname: '/'}}
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(postLogin({
            email: formData.email,
            password: formData.password
        }, history, from))
    }
    if (isAuth)
        return (<Redirect to={{pathname: '/'}}/>);


    return (
        <div className={style.container}>
            <div className={style.login_container}>
                <h3 className="text text_type_main-medium mb-6">Вход</h3>
                <form onSubmit={handleFormSubmit} className="form">
                    <div className="form__item mb-6">
                        <Input
                            placeholder="E-mail"
                            error={false}
                            errorText={"Ошибка"}
                            name={"email"}
                            size={"default"}
                            type={"email"}
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                    <div className="form_item mb-6">
                        <PasswordInput
                            type={"password"}
                            size={"default"}
                            placeholder="Пароль"
                            error={false}
                            errorText={"Ошибка"}
                            name={"password"}
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <div className={`${style.form_button} mb-20`}>
                        <Button type={"primary"} size="medium">Войти</Button>
                    </div>
                </form>
                <div className={style.login_links}>
                    <p className="text text_type_main-default text_color_inactive mb-4">Вы - новый
                        пользователь?
                        <Link to={"/register"} className="text text_color_accent">Зарегистрироваться
                        </Link></p>
                    <p className="text text_type_main-default text_color_inactive mb-4">Забыли пароль?
                        <Link to={"/forgot-password"} className="text text_color_accent"> Восстановить пароль </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;
