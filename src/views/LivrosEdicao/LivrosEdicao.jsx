import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import "./index.scss";
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { useParams } from 'react-router-dom';
import { LivrosService } from '../../api/LivrosService';

const LivrosEdicao = () => {  
  let { livroId } = useParams();

  const [livro, setLivro] = useState({});

  async function getLivro() {
    try {
      const { data } = await LivrosService.getLivro(livroId);
      setLivro(data);
    } catch (error) {
      alert(`Erro ao buscar o livro: ${error.response.data.message}`);
    }
  }

  async function editLivro(event) {
    event.preventDefault();

    const body = {
      id: Number(livro._id),
      titulo: livro.titulo,
      pages: Number(livro.pages),
      isbn: livro.isbn,
      editora: livro.editora
    };

    if (livro._id && livro.titulo && livro.pages && livro.isbn && livro.editora) {
      try {
        const { data } = await LivrosService.updateLivro(livro._id, body);
        alert(data.message);
      } catch (error) {
        const { data, status } = error.response;
        alert(`${status} - ${data.message}`);
      }
    } else {
      alert('Todos os campos são obrigatórios.');
    }
  }

  useEffect(() => {
    getLivro();
  }, []);

  return (
    <>
      <Header />    
      <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario" onSubmit={editLivro}>
            <div className='form-group'>
              <label>Id</label>
              <input type="text" disabled required value={livro._id || ''} />
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" required onChange={(event) => setLivro({ ...livro, titulo: event.target.value })} value={livro.titulo || ''} />
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" required onChange={(event) => setLivro({ ...livro, pages: event.target.value })} value={livro.pages || ''} />
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" required onChange={(event) => setLivro({ ...livro, isbn: event.target.value })} value={livro.isbn || ''} />
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" required onChange={(event) => setLivro({ ...livro, editora: event.target.value })} value={livro.editora || ''} />
            </div>
            <div className='form-group'>
              <button type="submit">Atualizar Livro</button>
            </div>                   
          </form>
        </div>        
      </div>
    </>
  );
}

export default LivrosEdicao;