import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, createAppointment } from '../../services/api';
import { format } from 'date-fns';

interface AvailabilityItem {
    hour: number;
    available: boolean;
}

export function CreateAppointment() {
    const { providerId } = useParams();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

    useEffect(() => {
        if (!providerId) return;

        api.get(`/providers/${providerId}/availability`, {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            }
        }).then(response => {
            setAvailability(response.data);
        });
    }, [selectedDate, providerId]);

    const selectedDateForInput = useMemo(() => {
        return format(selectedDate, 'yyyy-MM-dd');
    }, [selectedDate]);

    // --- FUNÇÃO CORRIGIDA ---
    async function handleCreateAppointment(hour: number) {
        const appointmentDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            hour,
        );

        const isConfirmed = window.confirm(`Deseja confirmar o agendamento para as ${hour}:00?`);

        // A verificação agora é simples: o usuário confirmou e temos um providerId?
        if (isConfirmed && providerId) {
            try {
                await createAppointment({
                    providerId,
                    serviceId: 1, // Usando ID de serviço fixo
                    date: appointmentDate,
                });

                alert('Agendamento realizado com sucesso!');
                navigate('/dashboard'); // Leva o usuário de volta para o dashboard
            } catch (error) {
                alert('Falha ao realizar o agendamento. Tente outro horário.');
                console.error('Erro ao criar agendamento:', error);
            }
        }
    }

    return (
        <div>
            <h1>Agendar Horário</h1>
            <p>Você está agendando com o prestador de ID: {providerId}</p>

            <div>
                <h4>Selecione o dia:</h4>
                <input 
                    type="date"
                    value={selectedDateForInput}
                    onChange={(e) => setSelectedDate(new Date(`${e.target.value}T00:00:00`))}
                />
            </div>
            <hr />
            <h4>Horários Disponíveis para o dia selecionado:</h4>
            <div>
                {availability.map(({ hour, available }) => (
                    <button 
                        key={hour} 
                        disabled={!available} 
                        style={{ margin: '5px', backgroundColor: available ? 'green' : 'grey' }}
                        // --- BOTÃO CORRIGIDO ---
                        onClick={() => handleCreateAppointment(hour)}
                    >
                        {`${hour}:00`}
                    </button>
                ))}
            </div>
        </div>
    );
}