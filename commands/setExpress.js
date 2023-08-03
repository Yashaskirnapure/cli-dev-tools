import { expressInstall } from "../utility/express-utility/expressInstall.js";
import { expressDir } from "../utility/express-utility/expressDir.js"

const setExpress = () => {
    expressInstall()
        .then(() => {expressDir();})
        .catch(()=>{console.log("Something went wrong while installing dependencies")});
}

export { setExpress };