export function getErrorMessage(alert, type, msg) {
  const TIME = 8000;

  const getAction = type => {
    switch (type) {
      case 'save':
        return 'сохранить';
      case 'delete':
        return 'удалить';
      case 'create':
        return 'создать';
    }
  }

  alert(`Не удалось ${getAction(type)} запись. ${msg}`, { variant: 'error', autoHideDuration: TIME });
}

export function getSuccessMessage(alert, type, msg) {
  const TIME = 5000;

  const getAction = type => {
    switch (type) {
      case 'save':
        return 'сохранена';
      case 'delete':
        return 'удалена';
      case 'create':
        return 'создана';
    }
  }

  alert(`Запись ${msg} успешно ${getAction(type)}`, { variant: 'success', autoHideDuration: TIME });
}
