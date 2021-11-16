import React, {useEffect, useState} from "react";
import style from "./user-profile.module.css";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useSupportInput} from "../../../hooks/support-input";
import {getUserInfo, postUserInfo} from "../../../services/actions/user";

const UserProfile = () => {
    const {user} = useSelector(state => state.userData);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [isChangeInput, setIsChangeInput] = useState(false);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch])

    useEffect(() => {
        setFormData({
            ...formData,
            email: user.email,
            name: user.name
        })
    }, [user, formData])

    const nameCustomInput = useSupportInput();
    const passCustomInput = useSupportInput();

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setIsChangeInput(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postUserInfo(formData));
        setIsChangeInput(false);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setFormData({
            email: user.email,
            name: user.name,
            password: ""
        })
        setIsChangeInput(false);
    }

    return (
        <form onSubmit={handleSubmit} className={`${style.form}`}>
            <div className="form__item mb-6">
                <Input
                    placeholder="Имя"
                    error={false}
                    name={"name"}
                    onChange={handleOnChange}
                    errorText={'Ошибка какая то'}
                    size={"default"}
                    type={"text"}
                    icon={"EditIcon"}
                    onBlur={passCustomInput.handleBlur}
                    onIconClick={passCustomInput.handleIconClick}
                    disabled={true}
                    ref={passCustomInput.ref}
                    value={formData.name}
                />
            </div>
            <div className="form__item mb-6">
                <EmailInput onChange={handleOnChange} value={formData.email} name={'email'}/>
            </div>
            <div className="form__item mb-6">
                <Input
                    placeholder="Пароль"
                    error={false}
                    name={"password"}
                    onChange={handleOnChange}
                    errorText={'Ошибка какая то'}
                    size={"default"}
                    type={"password"}
                    icon={"EditIcon"}
                    onBlur={nameCustomInput.handleBlur}
                    onIconClick={nameCustomInput.handleIconClick}
                    disabled={true}
                    ref={nameCustomInput.ref}
                    value={formData.password}
                />
            </div>
            {isChangeInput && (
                <div className={`${style.form_buttons} mb-20`}>
                    <Button type={"primary"} size="medium">Сохранить</Button>
                    <Button type={"secondary"} size="medium" onClick={handleCancel}>Отмена</Button>
                </div>
            )}
        </form>
    )
}
export default UserProfile;
