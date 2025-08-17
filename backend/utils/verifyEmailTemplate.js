const verifyEmailTemplate = ({ name, title, description }) => {
    return `
<h4>Dear ${name}</h4>    
<p>Subject: ${title}</p>
<p>${description}</p>
<br/>
<p>Click Know:</p>
<a href="https://varad-wagh-port-folio-git-main-varadwagh327s-projects.vercel.app" style="color:black;background :orange;margin-top : 10px,padding:20px,display:block">
 Varad Wagh Profile
</a>
`
}

export default verifyEmailTemplate;