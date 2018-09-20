module.exports = {
    home: {
        logo: '//*[@id="layout-c11"]//img',
        login: '//*[@id="casmenu"]/table/tbody/tr/td[2]/a',
        student_page: '//*[@id="layout-c12-t"]/div[2]/div/nav/ul/li[4]/a'
    },

    login: {
        username: '//*[@id="username"]',
        password: '//*[@id="password"]',
        login: '//*[@id="login"]/div[3]/input[3]'
    },

    student_page: {
        registration: '//*[@id="layout-c22a"]/div/table/tbody/tr[1]/td[2]/a'
    },

    registration: {
        select_registration: '(//tr[contains(@element, "wiersz_tury")]/td[6]//a)[%d]',
        course: '(//a/img[contains(@src, "koszyk_inB.gif")])[%d]',
        course_group: '//input[@type="radio" and @value="%d"]',
        confirm: '//*[@id="layout-c22"]/div[1]/table/tbody/tr[2]/td/form/table/tbody/tr[1]/td/input[6]',
        error: '//*[@id="error_notice"]/table/tbody/tr[1]/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]'
    }
}
