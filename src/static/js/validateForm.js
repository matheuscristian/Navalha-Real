function validateForm(formData, services, appointments) {    
    const inputAppointmentDate = new Date(formData["appointment-datetime"].value);
    const todayDate = new Date();

    if (inputAppointmentDate.getFullYear() != todayDate.getFullYear()) {
        alert("Ano inválido!");
        return false
    }

    const daysDiff = inputAppointmentDate.getDay() - todayDate.getDay()
    if (daysDiff < 0 || daysDiff > 30) {
        alert("Não é possível agendar um horário para depois de um mês ou para o passado.");
        return false;
    }

    inputServiceName = formData["service-type"].options[formData["service-type"].selectedIndex].text.split('-')[0].trim();
    const serviceDuration = services.find((v) => v.service_name == inputServiceName).duration;

    for (const appointment of appointments) {
        ap_start = new Date(appointment.appointment_date);
        ap_end = ap_start.now() + serviceDuration
        
        // if (appointment.)
    }

    return true;
}
