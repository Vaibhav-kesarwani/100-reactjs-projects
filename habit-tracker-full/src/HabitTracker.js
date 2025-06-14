import React, { useState, useEffect } from 'react';
import './HabitTracker.css';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const HabitTracker = () => {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('habit-data');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    const cleaned = parsed.map(habit => ({
                        id: habit.id,
                        name: habit.name,
                        record: Array.isArray(habit.record) ? habit.record.slice(0, 7) : Array(7).fill(false)
                    }));
                    setHabits(cleaned);
                }
            } catch (e) {
                console.error('Failed to parse habits from localStorage:', e);
            }
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('habit-data', JSON.stringify(habits))
    }, [habits]);

    const addHabit = (habitName) => {
        const newHabit = {
            id: Date.now(),
            name: habitName,
            record: Array(7).fill(false) // Array of 7 booleans: 7 days a week
        };
        setHabits([...habits, newHabit]);

    };   

    const editHabitName = (id, newName) => {
        const update = habits.map(h =>
            h.id === id ? {...h, name: newName} : h
        );
        setHabits(update);
    };

    const resetHabitRecord = (id) => {
        const updated = habits.map(h =>
            h.id === id ? { ...h, record: Array(7).fill(false) } : h
        );
        setHabits(updated);
    };



    const toggleCheck = (habitId, dayIndex) => {
        const newHabits = habits.map (habit => {
            if (habit.id === habitId) {
                const newRecord = [...habit.record];
                newRecord[dayIndex] = !newRecord[dayIndex];
                return { ...habit, record: newRecord };
            }
            return habit;
        })
        setHabits(newHabits);
    };

    const deleteHabit = (idToDelete) => {
        const updated = habits.filter(habit => habit.id !== idToDelete);
        setHabits(updated);
    };

    return (
        <div className="habit-container">
            <h2>Habit Tracker</h2>
            <HabitForm onAdd={addHabit} />
            {habits.map((habit, i) => (
                <div key={habit.id} className="habit">
                    <div className="habit-name">
                        <input
                            value={habit.name}
                            onChange={(e) => editHabitName(habit.id, e.target.value)}
                        />
                        <div>
                            <button className='reset-button' onClick={() => resetHabitRecord(habit.id)}> </button>
                            <button className='delete-button' onClick={() => deleteHabit(habit.id)}>❌</button>
                        </div>
                    </div>
                    <div className="days">
                        {weekdays.map((day,j) => (
                            <div
                                key={j}
                                className={`day ${habit.record[j] ? 'checked' : ''}`}
                                onClick={() => toggleCheck(habit.id, j)}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};



const HabitForm = ({ onAdd }) => {
    const [input, setInput] = useState('');
    return (
        <div className="habit-form">
            <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a habit"
            />
            <button onClick={() => { onAdd(input); setInput(''); }}>Add</button>
        </div>
    );
};

export default HabitTracker;