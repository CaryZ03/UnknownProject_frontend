import request from "@/utils/request";


//questionnaire export
export function getQuestionnaire_Export(data) {
    return request({
        method: 'GET',
        url: '/data/questionnaire_export',
        data,
    })
}

// questionnaire_export_file
export function getQuestionnaire_ExportFile(qn_id) {
    return request({
        method: 'GET',
        url: `/data/questionnaire_export_file/${qn_id}`,
    })
}

// questionnaire_analysis
export function getQuestionnaire_Analysis(data) {
    return request({
        method: 'GET',
        url: '/data/questionnaire_analysis',
        data,
    })
}

//get_questions_by_questionnaire
export function getQuestions_ByQuestionnaire(data) {
    return request({
        method: 'GET',
        url: '/data/get_questions_by_questionnaire',
        data,
    })
}

//get_answers_by_question
export function getAnswers_ByQuestion(data) {
    return request({
        method: 'GET',
        url: '/data/get_answers_by_question',
        data,
    })
}

// delete_answer
export function postAnswers_Delete(data) {
    return request({
        method: 'POST',
        url: '/data/delete_answer',
        data,
    })
}

export function postAnswers_process(data) {
    return request({
        method: 'POST',
        url: `/data/questionnaire_process`,
        data,
    })
}

// import_questionnaire
export function postQuestionnaire_Import(data) {
    return request({
        method: 'POST',
        url: '/data/import_questionnaire',
        data,
        headers: {
            'Content-Type':  'multipart/form-data',
        }
    })
}

//分析问卷
export function getQuestionnaire_Analyze(qn_id) {
    return request({
        method: 'GET',
        url: `/data/questionnaire_analysis/${qn_id}`,
    })
}
