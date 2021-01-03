const BW70 = {'mu': 0.29, 'pu': 0.90, 'di':1.4, 'sq':2};
const BW80 = {'mu': 0.27, 'pu': 0.89, 'di':1.4, 'sq':2};
const BW90 = {'mu': 0.25, 'pu': 0.83, 'di':1.4, 'sq':2};
const BWXX = {'mu': 0.20, 'pu': 0.80, 'di':1.3, 'sq':2};
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
        
        if (check) {
            var modalContent = $('.modal-body')
            modalContent.empty()
            var bw = $('#bw').val();
            var data = bw <= 70 ? BW70 : bw <= 80 ? BW80 : bw <= 90 ? BW90 : BWXX;
            var validation = true
            [Object.keys(NAME).forEach(mov => {
                var value = Math.ceil($('#' + mov).val());
                var diff = value - Math.floor(data[mov]*bw)
                
                if (diff >= 0) {
                    modalContent.append(
                    $('<p></p>').text(`✔️ Well done, you validate the requirements in ${NAME[mov]}`));
                    validation=false;
                } else {
                    modalContent.append($('<p></p>').text(`❌ You are missing ${diff} kg in ${NAME[mov]} to validate the requirements.`));
                }
                 
            })];
            
            modalContent.append($('<br>'))
                
                if (validation) {
                    modalContent.append($('<p></p>').text('Congratulations you seem to have the pre-requisites to join the team.fsp, you can contact us on instagram 🔥'));
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