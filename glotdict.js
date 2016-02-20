jQuery(document).ready(function () {
  select_language();
  gd_add_terms();
  
  function select_language() {
    jQuery('.filters-toolbar div').append('<select class="glotdict_language"></select>');
    jQuery.each(['it_IT', 'fr_FR'], function(key, value) {  
       var new_option = jQuery('<option></option>').attr('value',value).text(value);
       if(localStorage.getItem('gd_language') === value) {
           new_option.attr('selected',true);
       }
       jQuery('.glotdict_language').append(new_option); 
    });
    if(jQuery('select option:selected').length === 0 ) {
        localStorage.setItem('gd_language', jQuery('.glotdict_language option:first-child').text());
    }
    jQuery('.glotdict_language').change(function() {
       localStorage.setItem('gd_language', jQuery('.glotdict_language option:selected').text());
       location.reload();
    });
  }
  
  function gd_add_terms() {
    jQuery.ajax({
      url: glotdict_path + '/' + localStorage.getItem('gd_language') + '.json',
      dataType: 'json'
    }).done(function (data) {
      jQuery('.editor .original').each(function () {
        var loop_editor = this;
        jQuery.each(data, function (i, item) {
          add_term(i, loop_editor, item.translation, item.pos, item.comment);
        });
      });
      jQuery('.editor .original .glossary-word-glotdict').css({'cursor': 'help','border-bottom': '1px dashed'});
      jQuery('.editor').tooltip({
        items: '.editor .original .glossary-word-glotdict',
        content: function () {
          var content = jQuery('<ul>');
          jQuery.each(jQuery(this).data('translations'), function (i, e) {
            var def = jQuery('<li>');
            def.append(jQuery('<span>', {text: e.pos}).addClass('pos'));
            def.append(jQuery('<span>', {text: e.translation}).addClass('translation'));
            def.append(jQuery('<span>', {text: e.comment}).addClass('comment'));
            content.append(def);
          });
          return content;
        }
      });
    }).fail(function () {
      console.log('error on loading ' + localStorage.getItem('gd_language') + '.json');
    });
  }
  
  function add_term(word, element, translation, pos, comment) {
    var rgxp = new RegExp(word, 'g');
    var repl = '<span class="glossary-word-glotdict" data-translations=\'[{"translation":"' + translation + '","pos":"' + pos + '","comment":"' + comment + '"}]\'>' + word + '</span>';
    jQuery(element).html(jQuery(element).html().replace(rgxp, repl));
  }
});
