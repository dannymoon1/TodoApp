/**
 * Vanilla JavaScript for Todo Card
 */

document.addEventListener('DOMContentLoaded', () => {
  const timeRemainingEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
  const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
  const statusBadge = document.querySelector('[data-testid="test-todo-status"]');
  
  // Set a fixed due date: March 1, 2026 18:00 UTC
  // For the sake of the demo, let's make it relative to "now" so it shows something interesting
  // Let's say it's due in 2 days from the current local time provided in metadata
  // Current local time: 2026-04-13T07:27:06-07:00
  const dueDate = new Date('2026-04-15T10:00:00'); 

  function updateTimeRemaining() {
    const now = new Date();
    const diff = dueDate - now;
    const absDiff = Math.abs(diff);
    
    const seconds = Math.floor(absDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let text = '';
    const isOverdue = diff < 0;

    if (isOverdue) {
      timeRemainingEl.classList.add('overdue');
      if (hours < 1) {
        text = `Overdue by ${minutes} minutes`;
      } else if (days < 1) {
        text = `Overdue by ${hours} hours`;
      } else {
        text = `Overdue by ${days} days`;
      }
    } else {
      timeRemainingEl.classList.remove('overdue');
      if (minutes < 1) {
        text = 'Due now!';
      } else if (hours < 1) {
        text = `Due in ${minutes} minutes`;
      } else if (days < 1) {
        text = `Due in ${hours} hours`;
      } else if (days === 1) {
        text = 'Due tomorrow';
      } else {
        text = `Due in ${days} days`;
      }
    }

    timeRemainingEl.textContent = text;
  }

  // Initial update
  updateTimeRemaining();

  // Update every 60 seconds
  setInterval(updateTimeRemaining, 60000);

  // Checkbox toggle logic
  checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      statusBadge.textContent = 'Done';
      statusBadge.className = 'badge badge-status-done';
      document.querySelector('[data-testid="test-todo-card"]').style.opacity = '0.7';
    } else {
      statusBadge.textContent = 'In Progress';
      statusBadge.className = 'badge badge-status-progress';
      document.querySelector('[data-testid="test-todo-card"]').style.opacity = '1';
    }
  });

  // Log for debugging
  console.log('Todo Card initialized');
});