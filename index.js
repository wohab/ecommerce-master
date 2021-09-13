// import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import '../node_modules/@laylazi/bootstrap-rtl-scss/scss/bootstrap-rtl.scss';
import './scss/style.scss';
import './css/custom.css';
import './css/style.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';


$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $('.add-to-cart-btn').click(function() {
        alert('أضيف المنتج إلى عربة الشراء')
    });

    $('#copyright').text("جميع الحقوق محفوظة للمتجر سنة " + new Date().getFullYear());

    $('.product-option input[type="radio"]').change(function() {
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active'); 
    });

    // شيفرة تغير اسعار المنتج سواء بذيادة القيمه او غيرها

    $('[data-product-quantity]').on("change",function() {
        // أجلب الكمية الجديدة
        var newQuantity= $(this).val();

        // أبحث عن السطر الذي يحتوي معلومات هذا المنتج
        var $parent= $(this).parents('[data-product-info]');

        // أجلب سعر القطعة الواحدة من معلومات المنتج
        var pricePerUnit= $parent.attr('data-product-price');

        // السعر الإجمالي للمنتج بضرب سعر المنتج و العدد القطع المحدده
        var totalPriceForProduct = newQuantity * pricePerUnit;

        // عين السعر الجديد ضمن خلية السعر الإجمالي للمنتج في هذا السطر
        $parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

        // حدث تغير كمية المنتج
        calculateTotalPrice();
    });

    $('[data-remove-from-cart]').on("click", function(){
        $(this).parents('[data-product-info]').remove();
        // اعد حساب السعر الإجمالي بعد حذف احد المنتجات
        calculateTotalPrice();
    });

    function calculateTotalPrice() {
        // إنشاء متغير جديد لحفظ السعر الإجمالي
        var totalPriceForAllProducts = 0;

        // لكل سطر يمثل معلومات المنتج في الصفحة
        $('[data-product-info]').each(function(){

            // أجلب سعر القطعة الواحدة من الخاصية الموافقة
            var pricePerUnit = $(this).attr('data-product-price');

            // أجلب كمية المنتج من حقل أختيار الكمية
            var quantity = $(this).find('[data-product-quantity]').val();

            // نضرب القيم الي سويناها
            var totalPriceForProduct = pricePerUnit * quantity;

            // و نطبع القيم الأجمالية الي ضربناها
            totalPriceForAllProducts = totalPriceForAllProducts + totalPriceForProduct;
        });

        // حدث السعر الإجمالي لكل المنتجات في الصفحة
        $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    }

    var citiesByCountry = {
        ymn: ['صنعاء','الحديدة','أب','حجة','تعز','البيضاء','شبوة'],
        om: ['مسقط','ظفار','صلالة'],
        sa: ['جدة','الدمام','الرياض','تبوك','نجران'],
        ku: ['الكويت','الجحراء','حولي'],
        eg: ['القاهرة','الأسكندرية','الصعيد'],
        sy: ['حلب','دمشق','حمص'],
        iq: ['بغداد','البصرة','بابل','الأنبار','اربيل'],
    };

    // عتندما يتغير البلد
    $('#form-checkout select[name="country"]').on("click", function (){
        // اجلب رمز البلد
        var country = $(this).val();

        // أجلب مدن هذي البلد من المصفوفة
        var cities = citiesByCountry[country];

        // فرغ قائمة المدن
        $('#form-checkout select[name="city"]').empty();

        // إضافة خيار اختر مدينة
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">أختار المدينة</option>'
        );

        // أضف المدن إلى قائمة المدن
        cities.forEach(function(city){
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });
    });
    // عندما تتغير طريقة الدفع
    $('#form-checkout input[name="payment_method"]').on("click", function(){
        // أجلب القيمة المختارة حاليا
        var paymentMethod = $(this).val();
        
        if (paymentMethod === 'on_delivery') {
            // إذا كانت عند الاستلام, فعطل حقول بطاقة الأئتمان
            $('#credit-card-info input').prop('disabled', true);
        } else{
            // و إلا ففعلها
            $('#credit-card-info input').prop('disabled', false);
        }
        // بدل معلومات بطاقة الأئتمان بين الظهور و الإخفاء
        $('#credit-card-info').toggle();
    });

    $("#price-range").slider({
        range: true,
        min: 15,
        max: 1000,
        step: 1,
        values: [250, 800],
        slide: function(event, ui){
            $('#price-min').text(ui.values[0]);
            $('#price-max').text(ui.values[1]);
        }
        // slide: function (event, ui) {
        //     $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        // }
    });

    // $("#amount").val("$" + $("#slider-range").slider("values", 0) +
    //     " - $" + $("#slider-range").slider("values", 1));
});
