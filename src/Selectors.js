module.exports = {
    home: {
        logo: '//*[@id="layout-c11"]/img',
        login: '//*[@id="casmenu"]/table/tbody/tr/td[2]/a',
        student_page: '//*[@id="layout-c12-t"]/tbody/tr[2]/td/a[4]'
    },

    login: {
        username: '//*[@id="username"]',
        password: '//*[@id="password"]',
        login: '//*[@id="login"]/div[3]/input[3]'
    },

    student_page: {
        registration: '//*[@id="layout-c21"]/div[4]/a'
    },

    registration: {
        select_registration: '//*[@id="layout-c22"]/div/table[2]/tbody/tr[10]/td[6]/div/a/span',
        course: '//*[@id="layout-c22"]/div/table[2]/tbody/tr[%d]/td[4]/span[2]/a[1]/img',
        course_group: '//input[@type="radio" and @value="%d"]',
        confirm: '//*[@id="layout-c22"]/div[1]/table/tbody/tr[2]/td/form/table/tbody/tr[1]/td/input[6]',
        error: '//*[@id="error_notice"]/table/tbody/tr[1]/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]'
    }
}
