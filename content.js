console.log('ssvo loaded script')
btnlist=["spaceshipvotedemotab" ,"spaceshipvoterepotab" ,"spaceshipvotereadmetab" ]
framelist=["spaceshipvotedemoframe" ,"spaceshipvoterepoframe" ,"spaceshipvotereadmeframe" ]
window.markdownitReplaceLink=module.exports;
async function getDefaultBranch(owner, repo) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    const data = await response.json();

    console.log("Default Branch:", data.default_branch);
    return data.default_branch;
}
function uncentrify(x){
    x.style.alignItems="flex-start"
    x.style.marginInline="0"
}
async function run(){
    if (!window.location.href.includes('/votes/new')) {
        console.log('this is not a vote page')
        return
    }
    demobtn=document.querySelector('a[aria-label="Demo"]')
    repobtn=document.querySelector('a[aria-label="Repository"]')
    readmebtn=document.querySelector('a[aria-label="Readme"]')
    if (!(demobtn && repobtn && readmebtn)) {console.log('ssvo: buttons not found'); return}
    dxemo=demobtn.href
    rxepo=repobtn.href
    readme=readmebtn.href
    demo=dxemo.replace("github.com","tanjim.org/github.com/#") 
    repo=rxepo.replace("github.com","tanjim.org/github.com/#")
    mainb=await getDefaultBranch(repo.split("/")[3], repo.split("/")[4])
    mdroot=repo+`/raw/${mainb}/`
    var md = window.markdownit ? window.markdownit({
        html: true,       
        linkify: true,    
        typographer: true 

    }): null; //i give up with markdownitreplacelink
    if (!md) {
        console.log('ssvo: markdown-it not found, readme will not be rendered as markdown')
        md = {
            render: (text)=> {return text}
        }
    }
    console.log("ssvo: links", demo, repo, readme)
    readmec=""
    res=await fetch(readme)
    if (res.ok){
        readmec=await res.text()
    } else {
        console.log("ssvo: failed to fetch readme")
        readmec="Failed to fetch README: "+res.status
    }
    rreadme=md.render(readmec).replace(
        /(<img[^>]+src=["'])(?!https?:\/\/|\/)([^"']+)((["'])[^>]*>)/gi,
        (match, prefix, path, suffix) => {
            // Ensure mdroot doesn't have a trailing slash and path doesn't have a leading one
            const cleanRoot = mdroot.replace(/\/$/, "");
            const cleanPath = path.replace(/^\//, "");

            return `${prefix}${cleanRoot}/${cleanPath}${suffix}`;
        }
    );
    console.log([rreadme])
    rreadme=rreadme.replace("<img","<img style='max-width:40vw' ")

    //uncentrify(document.querySelector('div.ui-heading.ui-heading--blue.ui-heading--full'))
    //uncentrify(document.querySelector('div.votes-new__payout-meter'))
    uncentrify(document.querySelector('div.votes-new__main'))
    uncentrify(document.querySelector('div.votes-new__project'))
    newdiv=document.createElement("div")
    newdiv.style.display="flex"
    newdiv.style.flexGrow="1"
    newdiv.style.flexDirection="column"
    newdiv.style.height="100%"
    newdiv.style.width="100%"
    newdiv.innerHTML=`
    <p>(some sites like marketplace.visualstudio.com do not allow iframes, i cant do anything about this)</p>
    <div>
<a aria-label="DemoTab" id="spaceshipvotedemotab" target="_blank" data-action="click-&gt;vote-tracker#trackDemoClick auxclick-&gt;vote-tracker#trackDemoClick" class="btn btn--brown btn--borderless">
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 2.53125C7.44187 2.53125 2.53125 7.44187 2.53125 13.5C2.53125 19.5581 7.44187 24.4688 13.5 24.4688C19.5581 24.4688 24.4688 19.5581 24.4688 13.5C24.4688 7.44187 19.5581 2.53125 13.5 2.53125ZM7.04475 6.831C5.67562 8.1566 4.74773 9.87152 4.38713 11.7428C4.02653 13.6141 4.25071 15.551 5.02922 17.2905C5.80772 19.0299 7.1028 20.4876 8.73853 21.4654C10.3743 22.4432 12.2713 22.8938 14.1721 22.7559C16.0728 22.6181 17.885 21.8985 19.3625 20.6949C20.8401 19.4913 21.9113 17.862 22.4306 16.0284C22.95 14.1949 22.8924 12.2459 22.2655 10.4462C21.6387 8.64652 20.4731 7.08343 18.927 5.96925C18.5465 6.57744 18.0411 7.09781 17.4442 7.49588L16.0312 8.4375L16.2169 8.80875C16.3023 8.97966 16.3318 9.17312 16.3011 9.36171C16.2704 9.5503 16.1812 9.72446 16.046 9.8595C15.9109 9.99454 15.7366 10.0836 15.548 10.1141C15.3594 10.1446 15.166 10.115 14.9951 10.0294L14.3156 9.68962C14.0782 9.57089 13.8094 9.52981 13.5474 9.57221C13.2853 9.61461 13.0432 9.73833 12.8554 9.92587L12.7069 10.0733C12.213 10.5683 12.213 11.3693 12.7069 11.8631L13.0399 12.1961C13.3279 12.4852 13.7396 12.6169 14.1424 12.5494L15.4586 12.33C15.822 12.2692 16.1944 12.3705 16.4767 12.6056L17.973 13.8521C18.333 14.1525 18.4905 14.6329 18.3757 15.0896C17.9453 16.8098 17.0556 18.3808 15.8017 19.6346L14.9884 20.4491C14.8005 20.6367 14.5584 20.7604 14.2964 20.8028C14.0343 20.8452 13.7656 20.8041 13.5281 20.6854L13.356 20.5999C13.1458 20.4948 12.969 20.3333 12.8454 20.1334C12.7218 19.9335 12.6563 19.7031 12.6562 19.4681V18.243C12.6562 17.9077 12.5224 17.5849 12.285 17.3475L10.7696 15.8321C10.5821 15.6443 10.4584 15.4022 10.416 15.1401C10.3736 14.8781 10.4146 14.6093 10.5334 14.3719L10.9688 13.5L9.12375 11.655C8.12868 10.66 7.46945 9.37893 7.23825 7.99088L7.04475 6.831Z" fill="currentColor"></path>
</svg>
      Demo
</a>
<a aria-label="RepositoryTab"  id="spaceshipvoterepotab" target="_blank" data-action="click-&gt;vote-tracker#trackRepoClick auxclick-&gt;vote-tracker#trackRepoClick" class="btn btn--brown btn--borderless">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M0 2.25A2.25 2.25 0 0 1 2.25 0h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9A2.25 2.25 0 0 1 0 11.25zm10.688 4.5c0 .15-.06.292-.165.397L8.835 8.836a.563.563 0 1 1-.795-.795l1.29-1.29-1.29-1.29a.563.563 0 1 1 .795-.795l1.688 1.688a.56.56 0 0 1 .165.397m-7.71-.397a.563.563 0 0 0 0 .795l1.687 1.687a.563.563 0 1 0 .795-.795L4.17 6.75l1.29-1.29a.563.563 0 1 0-.795-.795z" clip-rule="evenodd"></path></svg>
      Repository
</a>
<a aria-label="ReadmeTab"  id="spaceshipvotereadmetab" target="_blank" rel="noopener noreferrer" class="btn btn--brown btn--borderless">
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="m19.18 7.132-4.206-4.306c-.512-.513-1.23-.82-2.05-.82H6.871C5.333 1.903 4 3.236 4 4.774v14.355A2.866 2.866 0 0 0 6.872 22h10.256A2.866 2.866 0 0 0 20 19.129V9.081c0-.718-.308-1.436-.82-1.949M8.923 10.106H12c.41 0 .82.308.82.82 0 .513-.307.82-.82.82H8.923a.81.81 0 0 1-.82-.82c0-.513.41-.82.82-.82m6.154 5.742H8.923c-.41 0-.82-.308-.82-.82s.307-.82.82-.82h6.154c.41 0 .82.307.82.82s-.41.82-.82.82"></path></svg>
      Readme
</a>
</div>

<iframe id="spaceshipvotedemoframe" class="spaceshipvoteframe" src="${demo}" style="display:none;flex-grow: 1;width: 100%;height:100vh;border: none;background-color:#fff" sandbox="allow-scripts allow-forms allow-popups allow-modals allow-downloads ${demo!=dxemo?"allow-same-origin":"allow-same-origin"}"></iframe>
<iframe id="spaceshipvoterepoframe" class="spaceshipvoteframe" src="${repo}" style="display:none;flex-grow: 1;width: 100%;height:100vh;border: none;background-color:#fff" sandbox="allow-scripts allow-forms allow-popups allow-modals allow-downloads ${repo!=rxepo?"allow-same-origin":"allow-same-origin"}"></iframe>
<div id="spaceshipvotereadmeframe" style="padding:30px;background-color:rgba(0,0,0,50);border-radius=20px;max-width:40vw"><pre style="white-space: pre-wrap; word-break: break-word;background-color:rgba(0,0,0,0) !important">${rreadme}</pre></div>
    `
    document.querySelector('div.votes-new__project').after(newdiv)
    window.currentTabSSVO=0
    btnlist.forEach((e,i)=>{ 
        elem=document.getElementById(e)
        elem.addEventListener("click",()=>{
            changeTab(i)
        })
    })
    changeTab(0)
    document.getElementById(framelist[2]).querySelectorAll("img").forEach((img)=>{
        img.style.maxWidth="35vw"
    })
}
function changeTab(idx){
    window.currentTabSSVO=idx
    btnlist.forEach((e,i)=>{
        elem=document.getElementById(e)
        // e.style.setProperty("background-color","#585b70","important")
        elem.style.removeProperty('background-color')
        frame=document.getElementById(framelist[i])
        if (i==idx){
            frame.style.display="block"
        } else {
            frame.style.display="none"
        }
    })
    document.getElementById(btnlist[idx]).style.setProperty("background-color","#585b70","important")
}
run()
