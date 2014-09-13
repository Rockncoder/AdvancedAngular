$('#select-intent').fancyselect();

// #select-intent-radio is part V1 B-22511
$('#select-intent, #select-intent-radio input[name="rdo-select-intent"]').change(function () {
  $('#combined-module .mod-content, #buy-known-module .mod-content').children().not('#select-intent-radio').hide();
  var id = $(this).val();
  $('#' + id).show();
  //$('.quick-view').hide();
  if (id == "buy-known-nc" && $('#' + id).find('select[name="yearid"]').val() != "") {
    $('#buy-known-nc .year').change();
  }
  else if ((id == "buy-known-uc-cpo" || id == "buy-known-cpo-uc") && $('#' + id).find('select[name="modelname"]').val() != "") {
    $('#buy-known-uc-cpo .model, #buy-known-cpo-uc .model').change();
  }
  if (id == "buy-known-nc") {
    $('#newcar-radio').prop('checked', 'checked');
    $('#browse-newcars, #newcar-radio').click();
  } else {
    $('#usedcar-radio').prop('checked', 'checked');
    $('#browse-usedcars, #usedcar-radio').click();
  }
});
$('#select-intent, #select-intent-radio input[name="rdo-select-intent"]:first').change();
function hideTierIIAd() { }  // remove when ad is no longer trafficked to SLPs

// can't be in doc.ready, causes problems when hitting back in IE9 when pointing to akamai
$('#sell-trade').ymm({ vehicleClass: 'UsedCar' });
$('#buy-known-nc').mmy({ vehicleClass: 'NewCar', includeYear: true });
$('#buy-known-nc-noyear').mmy({ vehicleClass: 'NewCar', includeYear: false });
$('#buy-known-about-tco').mmy({ vehicleClass: 'NewCar', includeYear: true, filter: 'HasTCO' });
$('#buy-known-uc').ymm({ vehicleClass: 'UsedCar', filterByCPO: true });
$('#buy-known-cpo').ymm({ vehicleClass: 'UsedCar', filterByCPO: true });
$('#buy-known-uc-nocpo').ymm({ vehicleClass: 'UsedCar' });
$('#filter-nc').mmy({ vehicleClass: 'NewCar', includeYear: true, filter: $('#filter-nc #filter').val(), priceMin: $('#filter-nc #priceMin').val(), priceMax: $('#filter-nc #priceMax').val() });
$('#filter-uc').ymm({ vehicleClass: 'UsedCar', filter: $('#filter-uc #filter').val(), priceMin: $('#filter-uc #priceMin').val(), priceMax: $('#filter-uc #priceMax').val() });
$('.box-border-b .box-content-a').clickable();

$(document).ready(function () {
  $('#formAllModels').mmy({ vehicleClass: 'NewCar', useStyledDropdowns: false, includeYear: false, modelDefault: 'All Models' });
  // need to reset dropdowns, since in IE9, when hit back, the previous selected make is selected, but the model is disabled.
  $("#buy-known-nc #kbbmanufacturer option:eq(0)").prop('selected', 'selected');
  $("#buy-known-uc #kbbyear option:eq(0)").prop('selected', 'selected');
  $("#buy-known-uc-nocpo #kbbyear option:eq(0)").prop('selected', 'selected');
  $("#buy-known-cpo-uc #kbbyear option:eq(0)").prop('selected', 'selected');
  $("#filter-nc #kbbmanufacturer option:eq(0)").prop('selected', 'selected');
  $("#filter-uc #kbbyear option:eq(0)").prop('selected', 'selected');
  $('#buy-known-nc-noyear #kbbmanufacturer option:eq(0)').prop('selected', 'selected');

  $('#Slp-select-slim-content .mod-content').height($('#Slp-browse-categories .mod-content').height());
  $('#Browse-category .browse-category li').click(function () {
    window.location = $(this).find('a').attr('href');
  });

  $('#Slp-browse-cat-link, #Slp-browse-make-link, #Slp-browse-oem-link, #Slp-browse-cpo-link').click(function () {
    var $this = $(this);
    if ($this.hasClass('disabled')) return false;

    $('#Slp-browse-cat-link, #Slp-browse-make-link, #Slp-browse-oem-link, #Slp-browse-cpo-link').removeClass('disabled');
    $this.addClass('disabled');
    $('#Browse-category, #Browse-make, #Browse-oem, #Browse-cpo').hide();
    switch (this.id) {
      case "Slp-browse-cat-link":
        $('#Browse-category').show();
        break;
      case "Slp-browse-make-link":
        $('#Browse-make').show();
        break;
      case "Slp-browse-oem-link":
        $('#Browse-oem').show();
        break;
      case "Slp-browse-cpo-link":
        $('#Browse-cpo').show();
        break;
    }
    $('#Slp-select-slim-content .mod-content').height($('#Slp-browse-categories .mod-content').height());
    return false;
  });

  $(':checkbox.search-cpo').click(function () {
    if ($(':checkbox.search-cpo:checked').length > 0) {
      $('#buy-known-uc').show();
      $('#buy-known-uc-nocpo').hide();
      $('#buy-known-uc input[name*="pricetype"]').val('cpo');
    } else {
      $('#buy-known-uc-nocpo').show();
      $('#buy-known-uc').hide();
      $('#buy-known-uc input[name*="pricetype"]').val('');
    }
  });

  $('#rdouc,#rdonc').click(function () {
    $('#buy-known-nc,#buy-known-uc').hide();
    $('#' + $(this).val()).show();
  });
  $('#rdouc').click(); //fix back button issue


  $('input[name="mileage"]').keypress(function (event) {
    if (event.keyCode == '13') {
      return submitForm($(this).attr("x:form"), $(this).attr("x:mileagereq") == "true");
    }
  });

  $('input[name=cpo]').prop('checked', $('input[name=pricetype]').val() == "cpo");
  $('input[name=cpo]').triggerHandler('click');

  if ($.browser.msie) {
    $("#Slp-whats-my-car-worth #kbbyear option[value='']").attr('selected', 'selected');
    $("#Slp-sell-it-myself #kbbyear option[value='']").attr('selected', 'selected');
  }

});

function submitForm(which, mileageRequired) {
  var form = $(which);
  form.find('.validation-error-ymm').hide();
  form.find('.validation-error-ymm-mileage').hide();
  form.find('.validation-error-mileage').hide();

  var mileage = form.find("input[name='mileage']").val();

  var isNc = (form.attr('id') == 'buy-known-nc' || form.attr('id') == 'filter-nc' || form.attr('id') == 'buy-known-nc-noyear' || form.attr('id') == 'buy-known-about-tco');
  if (isNc && form.find('select:eq(0)').val() != '' && form.find('select:eq(2)').val() == '') {
    var action = '/new-cars/year/';
    if (typeof $('#filter').val() != 'undefined') {
      action += '?filter=' + $('#filter').val();
    }
    form.attr('action', action);
  }

  if (form.find('select:eq(0)').val() == '' || (!isNc && (form.find('select:eq(1)').val() == '' || form.find('select:eq(2)').val() == ''))) {
    if (mileageRequired && (mileage == '' || mileage == form.find("input[name='mileage']").attr('title')))
      form.find('.validation-error-ymm-mileage').show();
    else
      form.find('.validation-error-ymm').show();
    return false;
  }

  if (mileageRequired && !validateMileage(mileage, form))
    return false;
  if (mileage != "" && mileage != form.find("input[name='mileage']").attr('title') && !validateMileage(mileage, form))
    return false;

  form.submit();
}

function validateMileage(mileage, form) {
  mileage = mileage.replace(',', unescape(''));
  var index = mileage.indexOf('.', 0);
  if (index != -1) {
    mileage = mileage.substr(0, index);
  }

  mileage = mileage.replace(/\s+/g, unescape(''));
  var re = /^(\d{1,6})$/;
  if (mileage == 0 || !re.test(mileage)) {
    form.find('.validation-error-mileage').show();
    return false;
  }

  form.find("input[name='mileage']").val(mileage);
  return true;
}

$('#formAllModels #btnSubmit').click(function () {
  $('#formAllModels #makeError').hide();
  var make = $('#formAllModels #manufacturername option:selected').val();
  var model = $('#formAllModels #modelname option:selected').val();

  if (make == "") {
    $('#formAllModels #makeError').show();
    return false;
  }

  PartnerLink('nx', 'knowcar_' + s.prop2 + '_btn', '', this);
  $('#formAllModels').submit();
});
//moved from newcar during slp clean up -sc
function sendRequest(url) {
  if (url) {
    beacon2ord = Math.random() * 10000000000000000;
    var img = new Image();

    if (url.match(/pxcc/ig)) {
      clientname = "qos-kbbp12011";
    }
    var urlValue = url + "u=" + clientname + ";ord=" + beacon2ord;
    img.src = urlValue;

  }
}
//for NN4 
if (document.layers) {
  (document.layers["adsLoadedInPlace"]) ? sendRequest("http://www.pxcc.com/abt/dclk.beaconreceived/;") : sendRequest("http://www.pxcc.com/abt/dclk.beacon/beacon1;");
}
//for IE
else if (document.all) {
  (document.all.adsLoadedInPlace) ? sendRequest("http://www.pxcc.com/abt/dclk.beaconreceived/;") : sendRequest("http://www.pxcc.com/abt/dclk.beacon/beacon1;");
}
//for NN5+
else if (document.getElementById && document.body.style && !(document.all)) {
  (document.getElementById("adsLoadedInPlace")) ? sendRequest("http://www.pxcc.com/abt/dclk.beaconreceived/;") : sendRequest("http://www.pxcc.com/abt/dclk.beacon/beacon1;");
}


//moved during slp clean up -sc
$(document).ready(function () {
  $('#kbbmodel').change(function () {
    $('#ymm-submit').removeClass('disabled');
  });
});
//moved during slp clean up -sc
$(document).ready(function () {
  $("#Slp-certified-pre-owned #CPO-program-details").addClass("mod-inv");
});
//moved during slp clean up -sc
$('#kbbmanufacturer, #kbbmodel, #kbbyear, .mileage input').removeClass('section-title');
$('#Slp-certified-pre-owned #kbbmanufacturer, #Slp-certified-pre-owned #kbbmodel, #Slp-certified-pre-owned #kbbyear').removeClass('section-title');
$('#Slp-new-cars #Slp-browse-cars.mod-primary .mod-head span.mod-title').html("Or Browse Vehicles");
