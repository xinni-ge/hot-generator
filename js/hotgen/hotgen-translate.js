(function(angular) {
    'use strict';
    angular_module.config(function ($translateProvider) {
        $translateProvider.translations('en', {
            TITLE: 'Generate Template',
            SUBTITLE: 'Please drag and drop resource icons into center canvas to define resource for template.',
            CREATE_TEMPLATE: 'Create Template',
            MANAGE_DRAFT: 'Manage Draft', // hidden
            CLEAR_ALL: 'Clear All',
            OK: 'OK',
            CANCEL: 'Cancel',
            NAME: 'Name',
            AZ: 'Availability Zone',
            COUNT: 'Count',
            CREATE_INSTANCE: 'Create Instance',
            DETAILS: 'Details',
            BOOT_SOURCE: 'Boot from source',

        });
        $translateProvider.translations('ja', {
            TITLE: 'テンプレートの作成',
            SUBTITLE: 'リソース毎のアイコンを中央のキャンバスにドラッグ・ドロップすることで、テンプレートに追加するリソースを定義してください。',
            CREATE_TEMPLATE: 'テンプレートの作成',
            MANAGE_DRAFT: '下書きの管理', // hidden
            CLEAR_ALL: 'キャンバスを初期化',
            OK: '作成',
            CANCEL: 'キャンセル',
            NAME: '名前',
            AZ: 'アベイラビリティーゾーン',
            COUNT: '数',
            CREATE_INSTANCE: 'インスタンスの作成',
            DETAILS: '詳細',
            BOOT_SOURCE: 'Boot from source',

        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escape');
    });
})(window.angular);