jQuery('#menu-headline-nav').append('<li class="current-menu-item gd_setting" style="cursor:pointer;"><a style="font-weight:bold;"> GlotDict</a></li>');
if (!gd_get_setting('hide_info_message')) {
  if (jQuery(window).width() > 1390) {
    jQuery('body').append('<div style="position: absolute;top: 320px;right: 10px;width:200px;background-color: #ddd;padding: .5em;">Don\’t forget to click on the <img class="gd_icon2">GlotDict icon in the blue menu!</div>');
    jQuery('.gd_icon2').attr('src', jQuery('.gd_icon').attr('src'));
  }
}
jQuery('.gd_icon').prependTo('.gd_setting').show();

jQuery('.gd_setting').click(function() {
  gd_generate_settings_panel();
});

jQuery('.gp-content').on('click', '.gd_settings_panel .gd_setting_check', function() {
  localStorage.setItem(jQuery(this).attr('id'), jQuery(this).is(':checked'));
});

function gd_generate_settings_panel() {
  if (jQuery('.gd_settings_panel').length !== 0) {
    jQuery('.gd_settings_panel').toggle();
    return;
  }
  var settings = {
    'no_final_dot': 'Don’t validate strings ending with “...“, “.”, “:”',
    'no_final_other_dots': 'Don’t validate strings ending with ;.!:、。؟？！',
    'no_initial_uppercase': 'Don’t show warning for missing uppercase first character in translation',
    'no_glossary_term_check': 'Don’t show warning for missing glossary term in translation',
    'no_non_breaking_space': 'Don’t visualize non-breaking-spaces in preview',
    'no_trailing_space': 'Hide warning for trailing space in translation',
    'curly_apostrophe_warning': 'Show warning for missing curly apostrophe in preview',
    'hide_info_message': 'Hide Info messages about this menu'
  };
  var container = '<div class="notice gd_settings_panel"><h2>GlotDict Settings</h2></div>';
  jQuery('.gp-content').prepend(container);
  var hotkeys = '<h3>Hotkeys</h3><ul>' +
    '<li>Shortcut on Ctrl+Shift+Z to click "Cancel"</li>' +
    '<li>Shortcut on Ctrl+Shift+A to click "Approve"</li>' +
    '<li>Shortcut on Ctrl+Shift+R to click "Reject"</li>' +
    '<li>Shortcut on Ctrl+Shift+F to click "Fuzzy"</li>' +
    '<li>Shortcut on Ctrl+Enter to click "Suggest new translation" or "Add translation"</li>' +
    '<li>Shortcut on Page Down to open the previous string to translate</li>' +
    '<li>Shortcut on Page Up to open the next string to translate</li>' +
    '<li>Shortcut on Ctrl+Shift+B to "Copy from original"</li>' +
    '<li>Shortcut on Ctrl+Shift+F to add non-breaking spaces near symbols</li>' +
    '<li>Shortcut on Ctrl+Alt+R to reset all the GlotDict settings</li>' +
    '<li>Right click of the mouse on the term with a dashed line and the translation will be added in the translation area</li>' +
    '</ul><br><h3>Settings</h3>';
  jQuery('.gd_settings_panel').append(hotkeys);
  jQuery.each(settings, function(key, value) {
    var checked = '';
    if (localStorage.getItem('gd_' + key) === 'true') {
      checked = 'checked';
    }
    jQuery('.gd_settings_panel').append('<input class="gd_setting_check" type="checkbox" id="gd_' + key + '" ' + checked + '> <label for="gd_' + key + '">' + value + '</label><br>');
  });
  jQuery('.gd_settings_panel').append('<br><h3>Do you want a new feature or settings? Ask <a href="https://github.com/Mte90/GlotDict/issues">here</a>.</h3><h3>Do you like this browser extension? You can donate <a href="https://www.paypal.me/mte90">here</a>.</h3>');
}

function gd_get_setting(key) {
  key = 'gd_' + key;
  if (localStorage.getItem(key) === null || localStorage.getItem(key) === 'false') {
    return false;
  }
  return true;
}
