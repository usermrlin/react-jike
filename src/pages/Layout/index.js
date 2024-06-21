import { request } from "@/utils/request";
import { useEffect } from "react";
const Layout = () => {
    useEffect(()=> {
        request.get('/user/profile')
    })
  return <div>这是Layout</div>;
};
export default Layout;
