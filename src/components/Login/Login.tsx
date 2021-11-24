import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import { Input } from "../common/FormControls/FormsControls";
import {connect} from "react-redux";
import { login } from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const Login = (props: any) => {
    const onSubmit = (formData:FormDataType) => {
        props.login(formData.login, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props: any) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"} validate={[require]} component={Input}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} type={"password"} validate={[require]} component={Input}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"}component={Input}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const mapStateToProps =(state:AppStateType) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login}) (Login);