import React, {useState} from "react";
import style from "./register.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {postRegister} from "../../services/actions/user";
import {useDispatch, useSelector} from "react-redux";

const  RegisterPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.userData);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(postRegister(formData, history))
    }

    if (isAuth) {
        return (<Redirect to={{pathname: '/'}}/>)
    }

    return (
        <div className="container">
            <div className={style.login_container}>
                <h3 className="text text_type_main-medium mb-6">Регистрация</h3>
                <form onSubmit={handleFormSubmit} className="form" action="">
                    <div className="form__item mb-6">
                        <Input
                            placeholder="Имя"
                            error={false}
                            name={"name"}
                            onChange={handleChange}
                            errorText={'Ошибка какая то'}
                            size={"default"}
                            type={"text"}
                            value={formData.name}
                        />
                    </div>
                    <div className="form__item mb-6">
                        <Input
                            placeholder="E-mail"
                            error={false}
                            errorText={"Ошибка какая то"}
                            name={"email"}
                            size={"default"}
                            type={"email"}
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                    <div className="form__item mb-6">
                        <PasswordInput
                            size={"default"}
                            placeholder="Пароль"
                            error={false}
                            errorText={"Ошибка какая то"}
                            name={"password"}
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <div className={`${style.form_button} mb-20`}>
                        <Button type={"primary"} size="medium">Зарегистрироваться</Button>
                    </div>
                </form>
                <div className={style.login_links}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Уже зарегистрированы? <Link to={`/login`} className="text text_color_accent">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default RegisterPage;
