import { Collections, Cancel, AddPhotoAlternate } from '@mui/icons-material';

export const ImagePicker = () => (
  <div>
    <div>
      <ul>
        <li>
          <Collections /> Выбрать готовую
        </li>
        <li>
          <AddPhotoAlternate /> Загрузить новую
        </li>
        <li>
          <Cancel /> Удалить
        </li>
      </ul>
    </div>
  </div>
);
