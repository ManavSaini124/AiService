
const {SignInView} = require("@/app/modules/auth/ui/views/sign-in-view")
const {auth} = require("@/lib/auth")
const {headers} = require("next/headers")
const {redirect} = require("next/navigation")

const page = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    
    if(!!session){
        redirect("/");
    }
    
    return <SignInView />

}
export default page