console.log('ssvo loaded script')
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
    demo=demobtn.href
    repo=repobtn.href
    readme=readmebtn.href
    console.log("ssvo: links", demo, repo, readme)
    //uncentrify(document.querySelector('div.ui-heading.ui-heading--blue.ui-heading--full'))
    //uncentrify(document.querySelector('div.votes-new__payout-meter'))
    uncentrify(document.querySelector('div.votes-new__main'))
    uncentrify(document.querySelector('div.votes-new__project'))
    newdiv=document.createElement("div")
    newdiv.innerHTML=`
    <h1>my div</h1>
    `
    document.querySelector('div.votes-new__project').after(newdiv)
}
run()
