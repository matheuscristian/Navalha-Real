function validateForm(formData, services, appointments) {
    const inputAppointmentDate = new Date(formData["appointment-datetime"].value);
    const todayDate = new Date();

    if (inputAppointmentDate.getFullYear() != todayDate.getFullYear()) {
        alert("Ano inválido!");
        return false;
    }

    const daysDiff = (inputAppointmentDate - todayDate) / 86400000;
    if (daysDiff < 0 || daysDiff > 30) {
        alert("Não é possível agendar um horário para depois de um mês ou para o passado.");
        return false;
    }

    const serviceDuration = services.find((v) => v.id == formData["service-type"].selectedIndex + 1).duration;

    for (const appointment of appointments) {
        const ap_start = new Date(appointment.appointment_date).getTime();
        const ap_end = ap_start + services.find((v) => v.id == appointment.service_id).duration * 60000;

        const iap_start = inputAppointmentDate.getTime();
        const iap_end = iap_start + serviceDuration * 60000;

        if ((iap_start >= ap_start && iap_start < ap_end) || (iap_end >= ap_start && iap_end < ap_end)) {
            alert("Data e hora inválida. Há outro agendamento no horário!");
            return false;
        }
    }

    return true;
}
