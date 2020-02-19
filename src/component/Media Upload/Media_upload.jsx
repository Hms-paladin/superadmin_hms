import React, { Component } from "react";
import "./Media_upload.css"
import Inputantd from "../../formcomponent/inputantd";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


export default class Media_upload extends Component {
    render() {
       return (
           <div className="media_upload">
              
                <div className="media_upload_header">
                <div className="media_upload_titleuser"><h3>MEDIA UPLOAD</h3></div>
                <div className="media_upload_container">
			    <Button className="media_button_cancel">Cancel</Button>
                <Button className="media_button_create">Create</Button>
            </div>
          </div>
          <div className="media_content">
          <div className="media_upload_layer_one">
          <div className="media_image"><h3>IMAGE</h3></div>

          <div className="image_main">
          <div className="set_width_mediaupload">
          <div className="image_content">
          <h4>Height (Pixel)</h4>
          <Inputantd className="image_media "  />
          </div>
          <div className="image_content">
          <h4>Width (Pixel)</h4>
          <Inputantd  className="image_media"  />
          </div>
          <div className="image_content">
          <h4>Size (Kb / Mb)</h4>
          <Inputantd className="image_media"  />
          </div>
          <div className="image_content">
          <h4>Resolution (DPI)</h4>
          <Inputantd className="image_media"  />
          </div>
          </div>
          <div  className="blank"/>
         <div className="media_content_two">
         <div className="image_content">
          <h4>Max Image</h4>
          <Inputantd className="content_image"  />
          </div>
          <div className="image_content">
          <h4>Max Active Image</h4>
          <Inputantd className="content_image_two"  />
          </div>
         </div>
         </div>
          </div>

          <div className="media_upload_layer_two">
          <div className="media_image"><h3>VIDEO</h3></div>

          <div className="image_main">
          <div className="set_width_mediaupload">
          <div className="image_content">
          <h4>Height (Pixel)</h4>
          <Inputantd className="image_media"  />
          </div>
          <div className="image_content">
          <h4>Width (Pixel)</h4>
          <Inputantd  className="image_media"  />
          </div>
          <div className="image_content">
          <h4>Size (Kb / Mb)</h4>
          <Inputantd className="image_media"  />
          </div>
          <div className="image_content">
          <h4>Resolution (DPI) </h4>
          <Inputantd className="image_media"  />
          </div>
          </div>
          <div  className="blank"/>
         <div className="media_content_two">
         <div className="image_content">
          <h4>Max Video</h4>
          <Inputantd className="content_image"  />
          </div>
          <div className="image_content">
          <h4>Max Active Video</h4>
          <Inputantd className="content_image_two"  />
          </div>
         </div>
         </div>
          </div> 
          </div>
          
          

           </div>
       )
    }
}