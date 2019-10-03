const options = {	
	// when this option is enabled, swup disables browser native scroll control (sets scrollRestoration to manual) and takes over this task. 
	// This means that position of scroll on previous page(s) is not preserved (but can be implemented manually based on use case). 
	// Otherwise swup scrolls to top/#element on popstate as it does with normal browsing.
	animateHistoryBrowsing: false,
	
	// animation selector
	animationSelector: '[class*="transition-"]',
	
	// defines link elements that will trigger the transition
	linkSelector:
    'a[href^="' +
    window.location.origin +
    '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])'
    
	// stores previously loaded contents of the pages in memory
	cache: true,
	
	preload: true,
	
	pageClassPrefix: '',
	
	scroll: true,
	
	doScrollingRightAway: false,
	animateScroll: true,
	scrollFriction: .3,
	scrollAcceleration: .04,
	
	support: true,
	
	debugMode: true,
	
	// default container(s)
	containers: ['#swup'],
	
	// request headers
	requestHeaders: {
	  'X-Requested-With': 'swup',
	  Accept: 'text/html, application/xhtml+xml'
	},
	
	// enable/disable plugins
	// see below
	plugins: [],
	
	// skips popState handling when using other tools manipulating the browser history
	skipPopStateHandling: function(event){
    if (event.state && event.state.source == "swup") {
        return false;
    }
    return true;
}
  
};
const swup = new Swup(options);



// trigger page view for GTM
swup.on('pageView', function() {
  dataLayer.push({
    event: 'VirtualPageview',
    virtualPageURL: window.location.pathname,
    virtualPageTitle: document.title
  });
});

swup.on('contentReplaced', function() {
  swup.options.containers.forEach((selector) => {
    // load scripts for all elements with 'selector'
    $("html, body").animate({
        scrollTop: 0
    }, 0);
  });
});



