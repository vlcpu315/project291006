
(function ($) {

    var eCalendar = function (options, object) {
        // Initializing global variables
        var adDay = new Date().getDate();
        var adMonth = new Date().getMonth();
        var adYear = new Date().getFullYear();
        var dDay = adDay;
        var dMonth = adMonth;
        var dYear = adYear;
        var instance = object;

        var settings = $.extend({}, $.fn.eCalendar.defaults, options);
        

        function lpad(value, length, pad) {
            if (typeof pad == 'undefined') {
                pad = '0';
            }
            var p;
            for (var i = 0; i < length; i++) {
                p += pad;
            }
            return (p + value).slice(-length);
        }

        var mouseOver = function () {
            $(this).addClass('c-nav-btn-over');
        };
        var mouseLeave = function () {
            $(this).removeClass('c-nav-btn-over');
        };
        var mouseOverEvent = function () {
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event-item[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveEvent = function () {
            $(this).removeClass('c-event-over')
            var d = $(this).attr('data-event-day');
            $('div.c-event-item[data-event-day="' + d + '"]').removeClass('c-event-over');
        };
        var mouseOverItem = function () {
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveItem = function () {
            $(this).removeClass('c-event-over')
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').removeClass('c-event-over');
        };
        var nextMonth = function () {
            if (dMonth < 11) {
                dMonth++;
            } else {
                dMonth = 0;
                dYear++;
            }
            print();
        };
        var previousMonth = function () {
            if (dMonth > 0) {
                dMonth--;
            } else {
                dMonth = 11;
                dYear--;
            }
            print();
        };

        function loadEvents() {
            if (typeof settings.url != 'undefined' && settings.url != '') {
                $.ajax({url: settings.url,
                    async: false,
                    success: function (result) {
                        settings.events = result;
                    }
                });
            }
        }

        function print() {
            loadEvents();
            var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay() - settings.firstDayOfWeek;
            if (dWeekDayOfMonthStart < 0) {
                dWeekDayOfMonthStart = 6 - ((dWeekDayOfMonthStart + 1) * -1);
            }
            var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
            var dLastDayOfPreviousMonth = new Date(dYear, dMonth + 1, 0).getDate() - dWeekDayOfMonthStart + 1;

            var cBody = $('<div/>').addClass('c-grid');
            var cEvents = $('<div/>').addClass('c-event-grid');
            var cEventsBody = $('<div/>').addClass('c-event-body');
            cEvents.append($('<div/>').addClass('c-event-title c-pad-top').html(settings.eventTitle));
            cEvents.append(cEventsBody);
            var cNext = $('<div/>').addClass('c-next c-grid-title c-pad-top');
            var cMonth = $('<div/>').addClass('c-month c-grid-title c-pad-top');
            var cPrevious = $('<div/>').addClass('c-previous c-grid-title c-pad-top');
            cPrevious.html(settings.textArrows.previous);
            cMonth.html(settings.months[dMonth] + ' ' + dYear);
            cNext.html(settings.textArrows.next);

            cPrevious.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', previousMonth);
            cNext.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', nextMonth);

            cBody.append(cPrevious);
            cBody.append(cMonth);
            cBody.append(cNext);
            var dayOfWeek = settings.firstDayOfWeek;
            for (var i = 0; i < 7; i++) {
                if (dayOfWeek > 6) {
                    dayOfWeek = 0;
                }
                var cWeekDay = $('<div/>').addClass('c-week-day c-pad-top');
                cWeekDay.html(settings.weekDays[dayOfWeek]);
                cBody.append(cWeekDay);
                dayOfWeek++;
            }
            
            
                        var day = 1;
            var dayOfNextMonth = 1;
             for (var i = 0; i < 42; i++) {
                var cDay = $('<div/>');
                if (i < dWeekDayOfMonthStart) {
                    cDay.addClass('c-day-previous-month c-pad-top');
                    cDay.html(dLastDayOfPreviousMonth++);
                } else if (day <= dLastDayOfMonth) {
                    
                    cDay.addClass('c-day c-pad-top');
                    if (day == dDay && adMonth == dMonth && adYear == dYear) {
                        cDay.addClass('c-today');
                    }
                     firebase.auth().onAuthStateChanged(function(user) {

                     var userid = user.uid;
                     var userlist = userid + "list";
                        firebase.database().ref(userlist).on('child_added', function(snapshot) {

                             var d=new Date();
                             var datestring=snapshot.val().expiration;


                             if (datestring.length==9) {
                             var setM=datestring.substring(0,1);
                             var setD=datestring.substring(2,4);
                             var setY=datestring.substring(5);
                             d.setDate(setD);
                             d.setMonth(setM - 1); 
                             d.setYear(setY); 
                             };
                              if (datestring.length==10) {
                             var setM=datestring.substring(0,2);
                             var setD=datestring.substring(3,5);
                             var setY=datestring.substring(6);
                             d.setDate(setD);
                             d.setMonth(setM - 1); 
                             d.setYear(setY); 
                             };
                    for (var j = 0; j < snapshot.numChildren(); j++) {
                        
                        if (d.getDate() == day && d.getMonth() == dMonth && d.getFullYear() == dYear) {
                            cDay.addClass('c-event').attr('data-event-day', d.getDate());
                            cDay.on('mouseover', mouseOverEvent).on('mouseleave', mouseLeaveEvent);
                        }
                    }             
                });
            }); 
           
                    cDay.html(day++);
                
            
                } else {
                    cDay.addClass('c-day-next-month c-pad-top');
                    cDay.html(dayOfNextMonth++);
                }
                cBody.append(cDay);
            }
                        
            
            
            var eventList = $('<div/>').addClass('c-event-list');
            
            firebase.auth().onAuthStateChanged(function(user) {

                 var userid = user.uid;
                 var userlist = userid + "list";
                    firebase.database().ref(userlist).on('child_added', function(snapshot) {

                         var d=new Date();
                         var datestring=snapshot.val().expiration;


                         if (datestring.length==9) {
                         var setM=datestring.substring(0,1);
                         var setD=datestring.substring(2,4);
                         var setY=datestring.substring(5);
                         d.setDate(setD);
                         d.setMonth(setM - 1); 
                         d.setYear(setY); 
                         };
                          if (datestring.length==10) {
                         var setM=datestring.substring(0,2);
                         var setD=datestring.substring(3,5);
                         var setY=datestring.substring(6);
                         d.setDate(setD);
                         d.setMonth(setM - 1); 
                         d.setYear(setY); 
                         };
                        
                //teststring= snapshot.key+snapshot.val().expiration;

                 //test.push(teststring);
                
            
            //for (var i = 0; i < settings.events.length; i++) 

                if (d.getMonth() == dMonth && d.getFullYear() == dYear) {
                    var date = lpad(d.getDate(), 2) + '/' + lpad(d.getMonth()+1, 2);
                    var keyyes = snapshot.key;
                    var item = $('<div/>').addClass('c-event-item');
                    var title = $('<div/>').addClass('title').html(date + '   ' + keyyes + '<br/>');          
                    item.attr('data-event-day', d.getDate());
                    item.on('mouseover', mouseOverItem).on('mouseleave', mouseLeaveItem);
                    item.append(title);

                    // Add the url to the description if is set
                   /** if( settings.events[i].url !== undefined )
                    {
                        /**
                         * If the setting url_blank is set and is true, the target of the url
                         * will be "_blank"
                         */
                        /**type_url = settings.events[i].url_blank !== undefined && 
                                   settings.events[i].url_blank === true ? 
                                   '_blank':'';
                        description.wrap( '<a href="'+ settings.events[i].url +'" target="'+type_url+'" ></a>' );
                    }**/

                    eventList.append(item);
                }
                });
            });
            $(instance).addClass('calendar');
            cEventsBody.append(eventList);
            $(instance).html(cBody).append(cEvents);
        }

        return print();
    }

    $.fn.eCalendar = function (oInit) {
        return this.each(function () {
            return eCalendar(oInit, $(this));
        });
    };
	
	
   
    
    /**var test=[
            {title: 'Beef' , description: '', datetime: new Date(2017, new Date().getMonth(), 12)},
            {title: 'Apple', description: '', datetime: new Date(2017, new Date().getMonth(), 23)},
            {title: 'Beef', description: 'beef2', datetime: new Date(2017, new Date().getMonth(), 31)},
			 {title: 'Test', description: '', datetime: new Date(2017, new Date().getMonth(), 23)},
			  {title: 'Apple', description: '', datetime: new Date(2017, new Date().getMonth(), 23)},
			   {title: 'Apple', description: '', datetime: new Date(2017, new Date().getMonth(), 23)}
        ];**/
	
    // plugin defaults
	
        
    $.fn.eCalendar.defaults = {
        weekDays: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'],
        textArrows: {previous: '<', next: '>'},
        eventTitle: 'Expiring foods',
        url: '',
        
        //events:	
		//[
        //    {title: 'Beef' , description: '', datetime: new Date(2017, new Date().getMonth(), 12)}
         //   {title: 'Apple', description: '', datetime: new Date(2017, new Date().getMonth(), 23)},
        //    {title: 'Beef', description: 'beef2', datetime: new Date(2017, new Date().getMonth(), 31)},
		//	 {title: 'Apple', description: '', datetime: new Date(2017, new Date().getMonth(), 23)},
		//	  {title: 'Apple', description: '', datetime: new Date(2017, new Date().getMonth(), 23)},
		//	   {title: 'Apple', description: '', datetime: new Date(2017, new Date().getMonth(), 23)}
        //],
        firstDayOfWeek: 0
    };
    
   

	
	
}(jQuery));