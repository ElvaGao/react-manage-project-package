import React from 'react'
//引入connect用于连接UI组件与redux
import { connect } from "react-redux"
// antd
import { Menu  } from 'antd';
// api接口
import siderbarStyle from "./Siderbar.module.scss"
import * as Icon from '@ant-design/icons';
// 路由
import { useNavigate, useLocation } from 'react-router-dom'

function HeaderUI(props){
    let { menuList } = props || []
    const navigate = useNavigate()
    const click = (e) => {
        //注意this指向问题，采用箭头函数this就指向当前组件
        navigate(e.key)
    }
    const location = useLocation()
    return (
            <Menu mode="inline"
                className={siderbarStyle.box}
                style={{ width: 220 }}
                onClick={click}
                // onOpenChange={this.onOpenChange.bind(this)} // SubMenu 展开/关闭的回调
                // openKeys={openKeys} // 当前展开的 SubMenu 菜单项 key 数组
                selectedKeys={location.pathname}
                theme="dark"
            >
                {
                    menuList.map(curr=>{
                        if(curr.children){     //判断是否是有下拉选项的菜单项
                            return (
                            <Menu.SubMenu
                                key={curr.key}
                                title={<span>{ React.createElement(Icon[curr.icon])}<span>{curr.label}</span></span>}
                            >{
                                curr.children.map(item=>{
                                    return (
                                    <Menu.Item 
                                        key={item.key}
                                        // onClick={this.menuChange}
                                    >{item.label}</Menu.Item>
                                    )
                                })
                            }</Menu.SubMenu>
                            )
                        }
                        return (
                            <Menu.Item 
                                key={curr.key}
                                // onClick={this.menuChange}
                                >
                                { React.createElement(Icon[curr.icon])}
                                <span>{curr.label}</span>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
    );
}

export default connect(
    state => ({
        menuList: state.menuList
    }),
    {}
)(HeaderUI);