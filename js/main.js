const BW66 = {'mu': 0.38, 'pu': 1.14, 'di':1.6, 'sq':2.7};
const BW73 = {'mu': 0.41, 'pu': 1.13, 'di':1.6, 'sq':2.6};
const BW80 = {'mu': 0.38, 'pu': 1.06, 'di':1.6, 'sq':2.6};
const BW87 = {'mu': 0.37, 'pu': 1.03, 'di':1.55, 'sq':2.5};
const BW94 = {'mu': 0.29, 'pu': 0.96, 'di':1.5, 'sq':2.5};
// const BW70 = {'mu': 0.29, 'pu': 0.90, 'di':1.4, 'sq':2};
// const BW80 = {'mu': 0.27, 'pu': 0.89, 'di':1.4, 'sq':2};
// const BW90 = {'mu': 0.25, 'pu': 0.83, 'di':1.4, 'sq':2};
// const BWXX = {'mu': 0.20, 'pu': 0.80, 'di':1.3, 'sq':2};
const NAME = {'mu': 'Muscle-up', 'pu': 'Pull-up', 'di':'Dips', 'sq':'Squat'};


(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        var testPassed = true;
        if (check) {
            var modalContent = $('.modal-body')
            modalContent.empty()
            var bw = $('#bw').val();
            const truncatedBw = Math.trunc(bw);
            var data = truncatedBw <= 66 ? BW66 : truncatedBw <= 73 ? BW73 : truncatedBw <= 80 ? BW80 : truncatedBw <= 87 ? BW87 : BW94;
            
            [Object.keys(NAME).forEach(mov => {
                var value = Math.ceil($('#' + mov).val());
                var diff = value - Math.floor(data[mov]*bw)
                
                if (diff >= 0) {
                    modalContent.append(
                    $('<p></p>').text(`✔️ Well done, you validate the requirements in ${NAME[mov]}`));
                } else {
                    modalContent.append($('<p></p>').text(`❌ You are missing ${diff} kg in ${NAME[mov]} to validate the requirements.`));
                    testPassed=false;
                }
                 
            })];
            
            modalContent.append($('<br>'));
                
            if (testPassed) {
                modalContent.append($('<p></p>').text('Congratulations you seem to have the performances pre-requisites to join the @team.fsp, you can contact us on instagram to go further in the process 🔥.'));
            } else {
                modalContent.append($('<p></p>').text('Unfortunately, you don\'t seem to have the level to validate our tests yet. Continue your training and try again later 💪'));
            }
            
            $('.modal').modal('show')
        }

        return false;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);
