document.addEventListener("DOMContentLoaded", function (event) {
    timeline();
});

function timeline() {
    var wrapper = document.getElementById('timeline'),
        line = document.getElementById('timeline-wrapper'),
        topStep = document.getElementsByClassName('step__point--top'),
        bottomStep = document.getElementsByClassName('step__point--bottom'),
        timelineOverscroll = document.getElementById('timelineOverscroll'),
        year = document.getElementsByClassName('timeline__year'),
        currentYear = document.getElementById('currentYear');

    var topArr = [],
        bottomArr = [];
    for (var i = 0; i < topStep.length; i++) {
        topArr.push(topStep[i].clientHeight);
    }
    for (var i = 0; i < bottomStep.length; i++) {
        bottomArr.push(bottomStep[i].clientHeight);
    }

    Array.prototype.max = function () {
        return Math.max.apply(null, this);
    };

    var topHeight = topArr.max(),
        bottomHeight = bottomArr.max();

    wrapper.style.height = topHeight + bottomHeight + 100 + 'px';
    line.style.top = topHeight + 25 + 'px';
    timelineOverscroll.style.height = wrapper.offsetHeight - 15 + 'px';

    var wrapperW = 0;
    for (var i = 0; i < year.length; i++) {
        wrapperW += year[i].offsetWidth;
        year[i].style.paddingTop = topHeight + 'px';
        year[i].style.marginTop = -topHeight + 'px';
    }

    line.style.width = wrapperW + 100 + 'px';

    //current year
    function currentPos(el) {
        if (el) {
            var ww = window.innerWidth,
                elw = el.offsetWidth;
            wrapper.scrollLeft = el.offsetLeft - (ww - elw) / 2;
        }
        else {
            wrapper.scrollLeft = 0;
        }
    }

    //scroll Wrapper
    function dragToScroll(element) {
        var curXPos, curDown;

        element.addEventListener('mousemove', function (e) {
            if (curDown) {
                element.scrollLeft += (curXPos - e.pageX) / 20;
            }
        });

        element.addEventListener('mousedown', function (e) {
            curXPos = e.pageX;
            curDown = true;
        });

        element.addEventListener('mouseup', function (e) {
            curDown = false;
        });
    }


    // buttons scroll
    function buttonsScroll(element) {
        var prev = document.getElementById('scrollLeft'),
            next = document.getElementById('scrollRight'),
            id = null;

        function scrollNext(e) {
            if (id == null) {
                id = setInterval(function () {
                    element.scrollLeft += 2;
                }, 1);
            }
        }

        function scrollPrev(e) {
            if (id == null) {
                id = setInterval(function () {
                    element.scrollLeft -= 2;
                }, 1);
            }
        }

        next.addEventListener('mousedown', scrollNext );
        next.addEventListener('touchstart', scrollNext );

        prev.addEventListener('mousedown', scrollPrev );
        prev.addEventListener('touchstart', scrollPrev );


        function scrollStop() {
            clearInterval(id);
            id = null;
        }

        var btn = [prev, next];
        btn.forEach(function (elem) {
            elem.addEventListener("mouseup", scrollStop );
            elem.addEventListener("touchend", scrollStop );
        });
    }

    dragToScroll(wrapper);
    buttonsScroll(wrapper);
    currentPos(currentYear);
}




//toggle class function
function toggleClass(el, _class) {
    if (el && el.className && el.className.indexOf(_class) >= 0) {
        var pattern = new RegExp('\\s*' + _class + '\\s*');
        el.className = el.className.replace(pattern, ' ');
    }
    else if (el) {
        el.className = el.className + ' ' + _class;
    }
    else {
        console.log("Element not found");
    }
}
