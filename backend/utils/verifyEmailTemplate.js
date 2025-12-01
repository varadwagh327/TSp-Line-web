const verifyEmailTemplate = ({ name, title, description, email }) => {
    return `
<h4>Dear HR Team,</h4>
<p>You have received a new message from <strong>${name}</strong></p>
<p><strong>Email:</strong> ${email || 'Not provided'}</p>
<p><strong>Subject:</strong> ${title}</p>
<p><strong>Message:</strong></p>
<p>${description}</p>
<br/>
<p>Click below to view profile:</p>
<a href="https://varad-wagh-port-folio-git-main-varadwagh327s-projects.vercel.app" style="color:white;background-color:orange;margin-top:10px;padding:15px 20px;display:inline-block;text-decoration:none;border-radius:5px;">
 View Varad Wagh Profile
</a>
`
}

export default verifyEmailTemplate;