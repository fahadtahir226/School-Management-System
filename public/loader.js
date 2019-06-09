var loader = document.querySelector('#loader');

loader.innerHTML = `
    <div class="loaderShell"></div>
    <div class="preloader-wrapper big active " >
    <div class="spinner-layer" >
    <div class="circle-clipper left">
    <div class="circle"></div>
    </div>
    <div class="gap-patch">
    <div class="circle"></div>
    </div>
    <div class="circle-clipper right">
    <div class="circle"></div>
    </div>
    </div>
    </div>`;

const Loading = (show) => {
    if (show) {
        document.querySelector('#loader').style.display = show
        document.querySelector('.loaderShell').style.display = show

    }

}