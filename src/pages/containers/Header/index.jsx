//引入connect用于连接UI组件与redux
import { connect } from "react-redux"
//引入action
import { setMenuList } from '../../../redux/actions/menuList'
import { setRole } from '../../../redux/actions/role'
// antd
import { Select } from 'antd';
// api接口
import headerStyle from "./Header.module.scss"
import { useNavigate } from 'react-router-dom'

function HeaderUI(props){
    let { role, roleList, setMenuList, setRole } = props
    const navigate = useNavigate()
    const handleChange = (value, Option) => {
        const { role } = {...Option}
        setRole(role)
        setMenuList(role.menuList)
        navigate('/home/welcome')
    };
    
    return (
        <div className={headerStyle.header}>
            <p>XX系统</p>
            <Select
                className={headerStyle.selectHeader}
                value={ role.roleName }
                style={{width: 160}}
                onChange={ handleChange }
                >
                {
                    roleList.map((item) => {
                        return <Select.Option key={item.roleName} value={item.roleName} role={item}>{item.roleName}</Select.Option>
                    })
                }
            </Select>
        </div>
    );
}

export default connect(
    state => ({
        roleList: state.roleList,
        role: state.role
    }),
    {
        setMenuList,
        setRole,
    }
)(HeaderUI);