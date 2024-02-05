const start_url = "http://localhost:5173";

const base = "/Sindalah-features";
const main = "/Sindalah-features";

const signin = `${base}/sign-in`; 
const signup = `${base}/sign-up`; 
const signout = `${base}/sign-out`;

// const profile = `${base}/profile`;

const forgotpassword = `${base}/forgot-password`;
    const forgotpassword_reset = `${base}/forgot-password/reset`;
    const forgotpassword_emailsent = `${base}/forgot-password/email-sent`;
    const forgotpassword_updated = `${base}/forgot-password/updated`;

const verification = `${base}/verification`; 
    const verification_email = `${base}/verification/email`; 
        const verification_email_sent = `${base}/verification/email/sent`; 
        const verification_email_fail = `${base}/verification/email/fail`; 
        const verification_email_done = `${base}/verification/email/done`; 
    const verification_verifyemail = `${base}/verification/verify-email`; 
    const verification_phone = `${base}/verification/phone`; 

const explore = `${base}/explore`
const allusers = `${base}/all-users`
const saved = `${base}/saved`
const createpost = `${base}/create-post`
const updatepost = `${base}/update-post/:id`
const post = `${base}/post/:id`
const profile = `${base}/profile/:id/*`
const updateprofile = `${base}/update-profile/:id`


export const paths = {base,main,signin,signup,verification,verification_email,verification_email_sent,verification_email_fail,verification_email_done,verification_verifyemail,verification_phone,start_url,forgotpassword,forgotpassword_reset,forgotpassword_emailsent,forgotpassword_updated,signout,profile,explore,allusers,saved,createpost,updatepost,post,updateprofile};


