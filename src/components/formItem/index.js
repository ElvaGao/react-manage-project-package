import { Form, Input, } from "antd";

export default function FormItem(props){
    const {type, children} = props
    return (
        <Form.Item
            {...props}
        >
            {
                (() => {
                    if( type === "input"){
                        return <Input />
                    } else {
                        return children
                    }
                })()
            }
            
        </Form.Item>
    )
}