//引入connect用于连接UI组件与redux
import { connect } from "react-redux"
//引入action
import { setRoleList } from './../../redux/actions/roleList'
import { setMenuList } from './../../redux/actions/menuList'
import { setRole } from './../../redux/actions/role'
import { setToken } from './../../redux/actions/token'
import { Fragment } from 'react';
// antd
import { Form, Button } from 'antd';
// 组件
import FormItem from "./../../components/formItem"
// api接口
import { login } from '../../api/login'
import loginStyle from "./Login.module.scss"

function LoginUI(props){
    const [form] = Form.useForm();
    const { setToken, setRoleList, setRole, setMenuList } = props
    const onFinish = (values) => {
        login(values).then((res) => {
            const { data } = res || {}
            const { token, roleList } = data || {}
            setToken(token)
            setRoleList(roleList)
            const role = roleList[0]
            setRole(role)
            const menuList = role.menuList
            setMenuList(menuList)
        })
        // console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        // console.log('Reset:', '重置')
        form.resetFields();
    }
    const name = {
        label: "用户名",
        name: 'username',
        type: 'input',
        rules: [
            {
            required: true,
            message: '请输入用户名',
            },
        ],
    }
    const password = {
        label: "密码",
        name: 'password',
        type: 'input',
        rules: [
            {
            required: true,
            message: '请输入密码',
            },
        ]
    }
    const submitBtn = {
        wrapperCol : { 
            offset: 8,
            span: 16,
        }
    }
    return (
        <div className={loginStyle.box}>
            <Form
            form={form}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={loginStyle.form}
            >
                <FormItem {...name}/>
                <FormItem {...password}/>
                <FormItem {...submitBtn}>
                    <Fragment >
                        <Button type="primary" htmlType="submit">提交</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={onReset} htmlType="button">重置</Button>
                    </Fragment>
                </FormItem>
            </Form>
            <div>
                {props.token}
                </div>
        </div>
    );
}

export default connect(
    state => ({
        roleList: state.roleList,
        menuList: state.menuList,
        role: state.role,
        token: state.token
    }),
    {
        setRoleList,
        setMenuList,
        setRole,
        setToken
    }
)(LoginUI);