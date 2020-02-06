$(pageLoad);

function pageLoad(){
    // Open/Close a modal 
    $(document).on('click', function(event){
        let target = $(event.target);
        let modal = $('.fullscreen-modal');

        if(modal.length == 0){
            // If the modal is hidden and the target is a project
            if(has(target, 'project')){
                openModal(target);
            }
        } else {
            // If the modal is shown and the target
            // isnt the modal or anything inside of it 
            if(!has(target, 'fullscreen-modal') || has(target, 'close-icon')){
                closeModal();
            }
        }
    });

    // Close the modal if the escape key is pressed
    $(document).keyup(function(event) {
        let modal = $('.fullscreen-modal');
        
        // Hide the modal if the esc key is pressed
        if(!modal.hasClass('hidden') && event.which == 27){
            closeModal();
        }
    });
}

function openModal(project){
    // The modal/blur that will be shown
    let blur = $(`<div class='blur hidden'></div>`).appendTo($('body'));
    let modal = $(`<div class='fullscreen-modal card hidden'>
                        <div class='close-icon card round card-hover'>
                            <img src='img/close-icon.svg'>
                        </div>
                        <a target='_blank' class='external-icon card round card-hover'>
                            <span>Demo</span>
                        </a>
                        <div class='modal-grid grid-centered'></div>
                   </div>`).appendTo($('body'));
    project = $(project);

    // If the element isnt a project but is a element on the project
    // select it 
    if(!project.hasClass('project')){
        project = project.parents('.project');
    }   

    // Add the external link to the modal's button
    modal.find(".external-icon").attr('href', project.attr('site'));

    // Add the modal's contents to the modal
    let modal_contents = project.find(".modal-contents");
    modal_contents.children().each(function() {
        $(this).clone().appendTo(".modal-grid");
    });


    // Lock the body scrolling
    // Is kept out of the timeout to prevent messing up animations
    toggleBodyScroll();

    // Display the modal/blur
    // Uses a timeout to keep the transitions
    setTimeout(function() {
        blur.removeClass('hidden');
        modal.removeClass('hidden');
    }, 50);
}

function closeModal(){
    let modal = $('.fullscreen-modal');
    let blur = $('.blur');
    modal.addClass('hidden');
    blur.addClass('hidden');

    // Unlock the scrolling
    // Is kept out of the timeout to prevent messing up animations
    toggleBodyScroll();

    // Remove the modal/blur
    // Uses a timeout to keep the transitions
    setTimeout(function() {
        blur.remove();
        modal.remove();
    }, 250);
}

// Used to lock the body's scroll when a modal is open
function toggleBodyScroll(){
    let root = $('html');

    // If the modal is already open - close it 
    if(root.hasClass('modal-open')){
        // Remove previous locks and remove classes / data variables set
        root.removeClass('modal-open').css('top', '');
        window.scrollTo(0, root.data('scroll'));
        root.removeData('scroll');
    } else {
        // Get the scroll position, store it, and 
        // lock the page / move the page down that amount 
        root.data('scroll', window.scrollY);
        root.addClass('modal-open').css('top', -root.data('scroll'));
    }
}

// A function that determines if a element has a class, 
// Or is a child of a element that has the class
function has(element, to_look){
    // Convert the element to a jquery element if not done already
    element = $(element);

    // See if the element has the class or is a child a element that has it 
    if(element.hasClass(to_look) || element.parents('.' + to_look).length > 0){
        return true;
    } else {
        return false;
    }
}